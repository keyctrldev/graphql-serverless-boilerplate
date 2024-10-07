-- Create the Claims table
CREATE TABLE Claims (
    claim_id INT PRIMARY KEY,                 -- Claim ID
    claim_status VARCHAR(50),                 -- Claim Status
    medication_name VARCHAR(100),             -- Medication Name
    claim_date DATE,                          -- Claim Date
    medication_cost INT,                      -- Medication Cost as Integer
    plan_paid INT,                            -- Plan Paid Amount as Integer
    member_paid INT,                          -- Member Paid Amount as Integer
    member_id VARCHAR(10)                     -- Member ID with format 'M001'
);