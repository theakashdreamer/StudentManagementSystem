// ── Sample Dummy Data for the Student Management System ──

import { generateId } from './helpers';

export const sampleStudents = [
  { id: 'STU001', name: 'Amit Patel', email: 'amit.patel@school.com', phone: '9876543210', class: '10-A', rollNo: '1001', gender: 'Male', dob: '2010-03-15', address: '12 MG Road, Mumbai', parentName: 'Rajesh Patel', parentPhone: '9876543200', bloodGroup: 'B+', admissionDate: '2024-04-01', status: 'active' },
  { id: 'STU002', name: 'Priya Sharma', email: 'priya.sharma@school.com', phone: '9876543211', class: '10-A', rollNo: '1002', gender: 'Female', dob: '2010-07-22', address: '45 Nehru Nagar, Delhi', parentName: 'Suresh Sharma', parentPhone: '9876543201', bloodGroup: 'A+', admissionDate: '2024-04-01', status: 'active' },
  { id: 'STU003', name: 'Rahul Kumar', email: 'rahul.kumar@school.com', phone: '9876543212', class: '10-B', rollNo: '1003', gender: 'Male', dob: '2010-11-08', address: '78 Gandhi Chowk, Pune', parentName: 'Vikram Kumar', parentPhone: '9876543202', bloodGroup: 'O+', admissionDate: '2024-04-01', status: 'active' },
  { id: 'STU004', name: 'Sneha Reddy', email: 'sneha.reddy@school.com', phone: '9876543213', class: '10-B', rollNo: '1004', gender: 'Female', dob: '2010-01-30', address: '23 Jubilee Hills, Hyderabad', parentName: 'Ramesh Reddy', parentPhone: '9876543203', bloodGroup: 'AB+', admissionDate: '2024-04-01', status: 'active' },
  { id: 'STU005', name: 'Arjun Singh', email: 'arjun.singh@school.com', phone: '9876543214', class: '9-A', rollNo: '901', gender: 'Male', dob: '2011-05-12', address: '56 Civil Lines, Jaipur', parentName: 'Mahendra Singh', parentPhone: '9876543204', bloodGroup: 'B-', admissionDate: '2024-04-01', status: 'active' },
  { id: 'STU006', name: 'Ananya Gupta', email: 'ananya.gupta@school.com', phone: '9876543215', class: '9-A', rollNo: '902', gender: 'Female', dob: '2011-09-03', address: '89 Sector 15, Noida', parentName: 'Anil Gupta', parentPhone: '9876543205', bloodGroup: 'A-', admissionDate: '2024-04-01', status: 'active' },
  { id: 'STU007', name: 'Vikash Yadav', email: 'vikash.yadav@school.com', phone: '9876543216', class: '9-B', rollNo: '903', gender: 'Male', dob: '2011-12-18', address: '34 Station Road, Lucknow', parentName: 'Dinesh Yadav', parentPhone: '9876543206', bloodGroup: 'O-', admissionDate: '2024-04-01', status: 'active' },
  { id: 'STU008', name: 'Kavya Nair', email: 'kavya.nair@school.com', phone: '9876543217', class: '8-A', rollNo: '801', gender: 'Female', dob: '2012-02-25', address: '67 Marine Drive, Kochi', parentName: 'Sunil Nair', parentPhone: '9876543207', bloodGroup: 'B+', admissionDate: '2024-04-01', status: 'active' },
  { id: 'STU009', name: 'Rohan Joshi', email: 'rohan.joshi@school.com', phone: '9876543218', class: '8-A', rollNo: '802', gender: 'Male', dob: '2012-06-10', address: '12 FC Road, Pune', parentName: 'Prakash Joshi', parentPhone: '9876543208', bloodGroup: 'A+', admissionDate: '2024-04-01', status: 'active' },
  { id: 'STU010', name: 'Meera Iyer', email: 'meera.iyer@school.com', phone: '9876543219', class: '8-B', rollNo: '803', gender: 'Female', dob: '2012-10-05', address: '45 T Nagar, Chennai', parentName: 'Venkatesh Iyer', parentPhone: '9876543209', bloodGroup: 'AB-', admissionDate: '2024-04-01', status: 'inactive' },
  { id: 'STU011', name: 'Aditya Mehta', email: 'aditya.mehta@school.com', phone: '9876543220', class: '11-Sci', rollNo: '1101', gender: 'Male', dob: '2009-04-14', address: '78 SG Highway, Ahmedabad', parentName: 'Hitesh Mehta', parentPhone: '9876543210', bloodGroup: 'O+', admissionDate: '2024-04-01', status: 'active' },
  { id: 'STU012', name: 'Divya Kapoor', email: 'divya.kapoor@school.com', phone: '9876543221', class: '11-Com', rollNo: '1102', gender: 'Female', dob: '2009-08-29', address: '23 Rajouri Garden, Delhi', parentName: 'Sanjay Kapoor', parentPhone: '9876543211', bloodGroup: 'B+', admissionDate: '2024-04-01', status: 'active' },
];

export const sampleTeachers = [
  { id: 'TCH001', name: 'Prof. Anita Sharma', email: 'anita.sharma@school.com', phone: '9876540001', gender: 'Female', qualification: 'M.Sc. Mathematics, B.Ed', experience: '12 years', subjects: ['Mathematics'], assignedClasses: ['10-A', '10-B', '9-A'], salary: 55000, joiningDate: '2018-06-15', status: 'active' },
  { id: 'TCH002', name: 'Dr. Vikram Desai', email: 'vikram.desai@school.com', phone: '9876540002', gender: 'Male', qualification: 'Ph.D. Physics', experience: '15 years', subjects: ['Physics'], assignedClasses: ['10-A', '10-B', '11-Sci'], salary: 62000, joiningDate: '2015-04-01', status: 'active' },
  { id: 'TCH003', name: 'Mrs. Sunita Verma', email: 'sunita.verma@school.com', phone: '9876540003', gender: 'Female', qualification: 'M.A. English, B.Ed', experience: '10 years', subjects: ['English'], assignedClasses: ['9-A', '9-B', '8-A', '8-B'], salary: 48000, joiningDate: '2020-07-01', status: 'active' },
  { id: 'TCH004', name: 'Mr. Arun Bhatt', email: 'arun.bhatt@school.com', phone: '9876540004', gender: 'Male', qualification: 'M.Sc. Chemistry', experience: '8 years', subjects: ['Chemistry'], assignedClasses: ['10-A', '10-B', '11-Sci'], salary: 50000, joiningDate: '2021-01-10', status: 'active' },
  { id: 'TCH005', name: 'Ms. Rekha Pillai', email: 'rekha.pillai@school.com', phone: '9876540005', gender: 'Female', qualification: 'M.A. Hindi', experience: '6 years', subjects: ['Hindi'], assignedClasses: ['8-A', '8-B', '9-A', '9-B'], salary: 42000, joiningDate: '2022-04-01', status: 'active' },
  { id: 'TCH006', name: 'Mr. Sanjay Tiwari', email: 'sanjay.tiwari@school.com', phone: '9876540006', gender: 'Male', qualification: 'MCA, B.Ed', experience: '9 years', subjects: ['Computer Science'], assignedClasses: ['10-A', '10-B', '11-Sci', '11-Com'], salary: 52000, joiningDate: '2019-08-01', status: 'active' },
  { id: 'TCH007', name: 'Mrs. Pooja Saxena', email: 'pooja.saxena@school.com', phone: '9876540007', gender: 'Female', qualification: 'M.Sc. Biology', experience: '7 years', subjects: ['Biology'], assignedClasses: ['9-A', '9-B', '11-Sci'], salary: 46000, joiningDate: '2021-06-15', status: 'active' },
  { id: 'TCH008', name: 'Mr. Deepak Chauhan', email: 'deepak.chauhan@school.com', phone: '9876540008', gender: 'Male', qualification: 'M.A. History, B.Ed', experience: '11 years', subjects: ['History', 'Geography'], assignedClasses: ['8-A', '8-B'], salary: 47000, joiningDate: '2019-04-01', status: 'inactive' },
];

export const sampleClasses = [
  { id: 'CLS001', name: '8-A', section: 'A', grade: '8', classTeacher: 'Mrs. Sunita Verma', totalStudents: 35, room: 'Room 201' },
  { id: 'CLS002', name: '8-B', section: 'B', grade: '8', classTeacher: 'Mr. Deepak Chauhan', totalStudents: 32, room: 'Room 202' },
  { id: 'CLS003', name: '9-A', section: 'A', grade: '9', classTeacher: 'Prof. Anita Sharma', totalStudents: 38, room: 'Room 301' },
  { id: 'CLS004', name: '9-B', section: 'B', grade: '9', classTeacher: 'Ms. Rekha Pillai', totalStudents: 36, room: 'Room 302' },
  { id: 'CLS005', name: '10-A', section: 'A', grade: '10', classTeacher: 'Dr. Vikram Desai', totalStudents: 40, room: 'Room 401' },
  { id: 'CLS006', name: '10-B', section: 'B', grade: '10', classTeacher: 'Mr. Arun Bhatt', totalStudents: 37, room: 'Room 402' },
  { id: 'CLS007', name: '11-Sci', section: 'Science', grade: '11', classTeacher: 'Mrs. Pooja Saxena', totalStudents: 42, room: 'Room 501' },
  { id: 'CLS008', name: '11-Com', section: 'Commerce', grade: '11', classTeacher: 'Mr. Sanjay Tiwari', totalStudents: 38, room: 'Room 502' },
];

export const sampleSubjects = [
  { id: 'SUB001', name: 'Mathematics', code: 'MATH', type: 'Core' },
  { id: 'SUB002', name: 'Physics', code: 'PHY', type: 'Core' },
  { id: 'SUB003', name: 'Chemistry', code: 'CHEM', type: 'Core' },
  { id: 'SUB004', name: 'Biology', code: 'BIO', type: 'Core' },
  { id: 'SUB005', name: 'English', code: 'ENG', type: 'Core' },
  { id: 'SUB006', name: 'Hindi', code: 'HIN', type: 'Core' },
  { id: 'SUB007', name: 'History', code: 'HIST', type: 'Elective' },
  { id: 'SUB008', name: 'Geography', code: 'GEO', type: 'Elective' },
  { id: 'SUB009', name: 'Computer Science', code: 'CS', type: 'Elective' },
  { id: 'SUB010', name: 'Economics', code: 'ECO', type: 'Elective' },
  { id: 'SUB011', name: 'Physical Education', code: 'PE', type: 'Optional' },
  { id: 'SUB012', name: 'Art', code: 'ART', type: 'Optional' },
];

export const sampleAttendance = [
  { id: 'ATT001', studentId: 'STU001', studentName: 'Amit Patel', class: '10-A', date: '2026-04-18', status: 'present' },
  { id: 'ATT002', studentId: 'STU002', studentName: 'Priya Sharma', class: '10-A', date: '2026-04-18', status: 'present' },
  { id: 'ATT003', studentId: 'STU003', studentName: 'Rahul Kumar', class: '10-B', date: '2026-04-18', status: 'absent' },
  { id: 'ATT004', studentId: 'STU004', studentName: 'Sneha Reddy', class: '10-B', date: '2026-04-18', status: 'present' },
  { id: 'ATT005', studentId: 'STU005', studentName: 'Arjun Singh', class: '9-A', date: '2026-04-18', status: 'present' },
  { id: 'ATT006', studentId: 'STU006', studentName: 'Ananya Gupta', class: '9-A', date: '2026-04-18', status: 'late' },
  { id: 'ATT007', studentId: 'STU007', studentName: 'Vikash Yadav', class: '9-B', date: '2026-04-18', status: 'present' },
  { id: 'ATT008', studentId: 'STU008', studentName: 'Kavya Nair', class: '8-A', date: '2026-04-18', status: 'present' },
  { id: 'ATT009', studentId: 'STU009', studentName: 'Rohan Joshi', class: '8-A', date: '2026-04-18', status: 'absent' },
  { id: 'ATT010', studentId: 'STU010', studentName: 'Meera Iyer', class: '8-B', date: '2026-04-18', status: 'present' },
  { id: 'ATT011', studentId: 'STU001', studentName: 'Amit Patel', class: '10-A', date: '2026-04-17', status: 'present' },
  { id: 'ATT012', studentId: 'STU002', studentName: 'Priya Sharma', class: '10-A', date: '2026-04-17', status: 'absent' },
  { id: 'ATT013', studentId: 'STU003', studentName: 'Rahul Kumar', class: '10-B', date: '2026-04-17', status: 'present' },
  { id: 'ATT014', studentId: 'STU004', studentName: 'Sneha Reddy', class: '10-B', date: '2026-04-17', status: 'present' },
  { id: 'ATT015', studentId: 'STU005', studentName: 'Arjun Singh', class: '9-A', date: '2026-04-17', status: 'late' },
];

export const sampleExams = [
  { id: 'EXM001', name: 'Mid-Term Examination', type: 'Mid-Term', class: '10-A', date: '2026-03-15', totalMarks: 100, status: 'completed' },
  { id: 'EXM002', name: 'Mid-Term Examination', type: 'Mid-Term', class: '10-B', date: '2026-03-15', totalMarks: 100, status: 'completed' },
  { id: 'EXM003', name: 'Unit Test 1', type: 'Unit Test', class: '9-A', date: '2026-02-20', totalMarks: 50, status: 'completed' },
  { id: 'EXM004', name: 'Annual Examination', type: 'Annual', class: '10-A', date: '2026-04-25', totalMarks: 100, status: 'upcoming' },
];

export const sampleMarks = [
  { id: 'MRK001', examId: 'EXM001', studentId: 'STU001', studentName: 'Amit Patel', class: '10-A', subject: 'Mathematics', marksObtained: 85, totalMarks: 100 },
  { id: 'MRK002', examId: 'EXM001', studentId: 'STU001', studentName: 'Amit Patel', class: '10-A', subject: 'Physics', marksObtained: 78, totalMarks: 100 },
  { id: 'MRK003', examId: 'EXM001', studentId: 'STU001', studentName: 'Amit Patel', class: '10-A', subject: 'Chemistry', marksObtained: 72, totalMarks: 100 },
  { id: 'MRK004', examId: 'EXM001', studentId: 'STU001', studentName: 'Amit Patel', class: '10-A', subject: 'English', marksObtained: 91, totalMarks: 100 },
  { id: 'MRK005', examId: 'EXM001', studentId: 'STU001', studentName: 'Amit Patel', class: '10-A', subject: 'Hindi', marksObtained: 88, totalMarks: 100 },
  { id: 'MRK006', examId: 'EXM001', studentId: 'STU002', studentName: 'Priya Sharma', class: '10-A', subject: 'Mathematics', marksObtained: 92, totalMarks: 100 },
  { id: 'MRK007', examId: 'EXM001', studentId: 'STU002', studentName: 'Priya Sharma', class: '10-A', subject: 'Physics', marksObtained: 88, totalMarks: 100 },
  { id: 'MRK008', examId: 'EXM001', studentId: 'STU002', studentName: 'Priya Sharma', class: '10-A', subject: 'Chemistry', marksObtained: 95, totalMarks: 100 },
  { id: 'MRK009', examId: 'EXM001', studentId: 'STU002', studentName: 'Priya Sharma', class: '10-A', subject: 'English', marksObtained: 89, totalMarks: 100 },
  { id: 'MRK010', examId: 'EXM001', studentId: 'STU002', studentName: 'Priya Sharma', class: '10-A', subject: 'Hindi', marksObtained: 82, totalMarks: 100 },
  { id: 'MRK011', examId: 'EXM001', studentId: 'STU003', studentName: 'Rahul Kumar', class: '10-B', subject: 'Mathematics', marksObtained: 65, totalMarks: 100 },
  { id: 'MRK012', examId: 'EXM001', studentId: 'STU003', studentName: 'Rahul Kumar', class: '10-B', subject: 'Physics', marksObtained: 58, totalMarks: 100 },
  { id: 'MRK013', examId: 'EXM001', studentId: 'STU003', studentName: 'Rahul Kumar', class: '10-B', subject: 'English', marksObtained: 72, totalMarks: 100 },
  { id: 'MRK014', examId: 'EXM001', studentId: 'STU004', studentName: 'Sneha Reddy', class: '10-B', subject: 'Mathematics', marksObtained: 88, totalMarks: 100 },
  { id: 'MRK015', examId: 'EXM001', studentId: 'STU004', studentName: 'Sneha Reddy', class: '10-B', subject: 'Physics', marksObtained: 91, totalMarks: 100 },
  { id: 'MRK016', examId: 'EXM003', studentId: 'STU005', studentName: 'Arjun Singh', class: '9-A', subject: 'Mathematics', marksObtained: 42, totalMarks: 50 },
  { id: 'MRK017', examId: 'EXM003', studentId: 'STU005', studentName: 'Arjun Singh', class: '9-A', subject: 'English', marksObtained: 38, totalMarks: 50 },
  { id: 'MRK018', examId: 'EXM003', studentId: 'STU006', studentName: 'Ananya Gupta', class: '9-A', subject: 'Mathematics', marksObtained: 46, totalMarks: 50 },
  { id: 'MRK019', examId: 'EXM003', studentId: 'STU006', studentName: 'Ananya Gupta', class: '9-A', subject: 'English', marksObtained: 44, totalMarks: 50 },
];

export const sampleFees = [
  { id: 'FEE001', studentId: 'STU001', studentName: 'Amit Patel', class: '10-A', feeType: 'Tuition Fee', amount: 15000, dueDate: '2026-04-30', paidDate: '2026-04-10', status: 'paid', month: 'April 2026' },
  { id: 'FEE002', studentId: 'STU001', studentName: 'Amit Patel', class: '10-A', feeType: 'Lab Fee', amount: 3000, dueDate: '2026-04-30', paidDate: '2026-04-10', status: 'paid', month: 'April 2026' },
  { id: 'FEE003', studentId: 'STU002', studentName: 'Priya Sharma', class: '10-A', feeType: 'Tuition Fee', amount: 15000, dueDate: '2026-04-30', paidDate: null, status: 'pending', month: 'April 2026' },
  { id: 'FEE004', studentId: 'STU003', studentName: 'Rahul Kumar', class: '10-B', feeType: 'Tuition Fee', amount: 15000, dueDate: '2026-03-31', paidDate: null, status: 'overdue', month: 'March 2026' },
  { id: 'FEE005', studentId: 'STU003', studentName: 'Rahul Kumar', class: '10-B', feeType: 'Tuition Fee', amount: 15000, dueDate: '2026-04-30', paidDate: null, status: 'pending', month: 'April 2026' },
  { id: 'FEE006', studentId: 'STU004', studentName: 'Sneha Reddy', class: '10-B', feeType: 'Tuition Fee', amount: 15000, dueDate: '2026-04-30', paidDate: '2026-04-05', status: 'paid', month: 'April 2026' },
  { id: 'FEE007', studentId: 'STU005', studentName: 'Arjun Singh', class: '9-A', feeType: 'Tuition Fee', amount: 12000, dueDate: '2026-04-30', paidDate: '2026-04-12', status: 'paid', month: 'April 2026' },
  { id: 'FEE008', studentId: 'STU006', studentName: 'Ananya Gupta', class: '9-A', feeType: 'Tuition Fee', amount: 12000, dueDate: '2026-04-30', paidDate: null, status: 'pending', month: 'April 2026' },
  { id: 'FEE009', studentId: 'STU007', studentName: 'Vikash Yadav', class: '9-B', feeType: 'Tuition Fee', amount: 12000, dueDate: '2026-04-30', paidDate: '2026-04-15', status: 'paid', month: 'April 2026' },
  { id: 'FEE010', studentId: 'STU008', studentName: 'Kavya Nair', class: '8-A', feeType: 'Tuition Fee', amount: 10000, dueDate: '2026-03-31', paidDate: null, status: 'overdue', month: 'March 2026' },
  { id: 'FEE011', studentId: 'STU009', studentName: 'Rohan Joshi', class: '8-A', feeType: 'Tuition Fee', amount: 10000, dueDate: '2026-04-30', paidDate: '2026-04-08', status: 'paid', month: 'April 2026' },
  { id: 'FEE012', studentId: 'STU011', studentName: 'Aditya Mehta', class: '11-Sci', feeType: 'Tuition Fee', amount: 18000, dueDate: '2026-04-30', paidDate: null, status: 'pending', month: 'April 2026' },
];

export const sampleNotices = [
  { id: 'NOT001', title: 'Annual Day Celebration', content: 'We are pleased to announce that the Annual Day Celebration will be held on May 15, 2026. All students are required to participate in cultural activities. Practice sessions will begin from next week.', category: 'Event', date: '2026-04-18', author: 'Dr. Rajesh Kumar', priority: 'high' },
  { id: 'NOT002', title: 'Mid-Term Results Published', content: 'Mid-term examination results for all classes have been published. Students can check their results in the Marks section. Parent-teacher meeting is scheduled for April 25, 2026.', category: 'Academic', date: '2026-04-16', author: 'Prof. Anita Sharma', priority: 'medium' },
  { id: 'NOT003', title: 'Fee Payment Reminder', content: 'This is a reminder that tuition fees for April 2026 are due by April 30. Students with pending fees are requested to clear their dues at the earliest to avoid late fee charges.', category: 'Finance', date: '2026-04-15', author: 'Admin Office', priority: 'high' },
  { id: 'NOT004', title: 'Sports Week Announcement', content: 'Inter-class sports week will be conducted from May 5-10, 2026. Events include Cricket, Football, Basketball, Athletics, and Table Tennis. Registration forms are available with class teachers.', category: 'Sports', date: '2026-04-14', author: 'Mr. Deepak Chauhan', priority: 'medium' },
  { id: 'NOT005', title: 'Science Exhibition', content: 'Annual Science Exhibition will be held on May 1, 2026. Students from classes 8-12 can participate. Projects should be submitted by April 28. Best projects will be awarded prizes.', category: 'Academic', date: '2026-04-12', author: 'Dr. Vikram Desai', priority: 'low' },
  { id: 'NOT006', title: 'Summer Vacation Notice', content: 'Summer vacation will commence from May 20, 2026 to June 30, 2026. School will reopen on July 1, 2026. Students should complete all holiday homework assignments.', category: 'General', date: '2026-04-10', author: 'Dr. Rajesh Kumar', priority: 'high' },
];

// Function to get all data as a combined object (useful for initializing state)
export function getAllSampleData() {
  return {
    students: sampleStudents,
    teachers: sampleTeachers,
    classes: sampleClasses,
    subjects: sampleSubjects,
    attendance: sampleAttendance,
    exams: sampleExams,
    marks: sampleMarks,
    fees: sampleFees,
    notices: sampleNotices,
  };
}
