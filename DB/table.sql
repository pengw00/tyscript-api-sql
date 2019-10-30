SELECT * FROM Student;
DELETE from Student where gender = 4;
INSERT INTO Student (name, entered, grade, gender) VALUES ('David Wu', 1998, 7, 'male');
ALTER TABLE Student ALTER COLUMN gender varchar;
DROP TABLE Student;
CREATE TABLE OfferedClass (
    id INT NOT NULL IDENTITY(1,1),
    name varchar(100),
    entered INT,
    grade INT,
    gender varchar(100)
);