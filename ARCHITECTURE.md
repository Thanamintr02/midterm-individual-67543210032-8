### 2. ไฟล์ ARCHITECTURE.md

```markdown
# Software Architecture Document (C4 Model)

## 🟢 C1: Context Diagram
ระบบจัดการห้องสมุดนี้ช่วยให้ **บรรณารักษ์ (Librarian)** สามารถจัดการข้อมูลหนังสือผ่าน **Web Browser** โดยระบบจะเก็บข้อมูลทั้งหมดไว้ใน **Local Database (SQLite)**

## 🔵 C2: Container Diagram (Layered Architecture)



┌─────────────────────────────────────┐
│     Presentation Layer              │
│  ┌──────────────────────────────┐   │
│  │ Routes → Controllers         │   │
│  │ (HTTP Handling)              │   │
│  └──────────────────────────────┘   │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│     Business Logic Layer            │
│  ┌──────────────────────────────┐   │
│  │ Services → Validators        │   │
│  │ (Business Rules)             │   │
│  └──────────────────────────────┘   │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│     Data Access Layer               │
│  ┌──────────────────────────────┐   │
│  │ Repositories → Database      │   │
│  │ (SQL Queries)                │   │
│  └──────────────────────────────┘   │
└──────────────┬──────────────────────┘
               │
               ▼
          ┌──────────┐
          │  SQLite  │
          └──────────┘

---

## 🛠️ Layer Responsibilities

1. **Presentation Layer (`src/presentation`)**
   - **Routes:** กำหนด Path ของ API (เช่น `/api/books`)
   - **Controllers:** รับ Request จาก Client, ดึงข้อมูลจาก Body/Params และส่ง Response (JSON) กลับไป
   - **Middleware:** จัดการเรื่อง Error Handling ทั่วทั้งระบบ

2. **Business Logic Layer (`src/business`)**
   - **Services:** หัวใจของระบบ ทำหน้าที่คำนวณ (สถิติ) และตัดสินใจตามเงื่อนไข (เช่น หนังสือถูกยืมอยู่จะยืมซ้ำไม่ได้)
   - **Validators:** ตรวจสอบความถูกต้องของข้อมูล (Format ISBN, ข้ามฟิลด์ว่าง)

3. **Data Access Layer (`src/data`)**
   - **Repositories:** เป็นส่วนเดียวที่เขียนคำสั่ง SQL เพื่อคุยกับ Database
   - **Connection:** จัดการการเปิด-ปิด การเชื่อมต่อกับไฟล์ `library.db`

---

## 🔄 Data Flow (Request → Response)

เมื่อ User ทำการ "ยืมหนังสือ" ผ่านหน้าเว็บ:
1. **Client:** ส่ง `PATCH /api/books/1/borrow` มาที่ Server
2. **Presentation:** `Route` ส่งงานต่อให้ `BookController.borrowBook(id)`
3. **Business:** `Controller` เรียก `BookService.borrowBook(id)`
   - Service ตรวจสอบจาก Repository ว่าหนังสือว่างไหม (Logic)
   - ถ้าว่าง ให้สั่ง Repository อัปเดตสถานะเป็น 'borrowed'
4. **Data:** `Repository` รัน SQL: `UPDATE books SET status = 'borrowed' WHERE id = ?`
5. **Response:** ข้อมูลที่อัปเดตแล้วจะถูกส่งย้อนกลับไปจนถึง `Controller` เพื่อตอบกลับ Client เป็น JSON