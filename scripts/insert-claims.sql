-- Insert sample data into the Claims table
INSERT INTO Claims (claim_id, claim_status, medication_name, claim_date, medication_cost, plan_paid, member_paid, member_id)
VALUES
(1, 'Approved', 'Aspirin', '2024-09-30', 25, 20, 5, 'M001'),
(2, 'Pending', 'Ibuprofen', '2024-10-01', 15, 12, 3, 'M001'),
(3, 'Denied', 'Amoxicillin', '2024-09-25', 30, 0, 30, 'M001'),
(4, 'Approved', 'Metformin', '2024-09-29', 40, 35, 5, 'M001'),
(5, 'Pending', 'Lisinopril', '2024-10-02', 18, 14, 4, 'M001');