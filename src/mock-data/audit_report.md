### KẾT QUẢ KIỂM TRA & AUTO-PATCH

**1. Dữ liệu mồ côi (Relational Integrity)**
- Hoàn hảo (0 lỗi)

**2. Logic Thời gian (Chronological)**
- LeaveRequest 501 actionDate is missing or before requestDate
- LeaveRequest 502 actionDate is missing or before requestDate
- LeaveRequest 503 actionDate is missing or before requestDate

**3. Vòng đời Trạng thái (Status Lifecycle)**
- LeaveRequest 501 missing or invalid approverId for status ĐÃ_DUYỆT
- LeaveRequest 502 missing or invalid approverId for status ĐÃ_DUYỆT
- LeaveRequest 503 missing or invalid approverId for status TỪ_CHỐI

**4. Dữ liệu Phái sinh & Tính toán (Derived Data)**
- Hoàn hảo (0 lỗi)

*Tất cả 6 lỗi trên đã được PATCH (tự động sửa) vào file JSON tương ứng.*
