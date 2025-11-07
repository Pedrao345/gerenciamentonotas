import React, { useMemo } from 'react';
import { Student, StudentStatus } from '../types';
import { PASSING_GRADE, RECOVERY_GRADE, MINIMUM_ATTENDANCE } from '../constants';
import { TrashIcon } from './icons/TrashIcon';

interface StudentRowProps {
  student: Student;
  onUpdateGrade: (studentId: string, subject: string, score: number | null) => void;
  onUpdateAttendance: (studentId: string, attendance: number | null) => void;
  onDeleteStudent: (student: Student) => void;
}

const statusStyles: { [key in StudentStatus]: string } = {
  [StudentStatus.Aprovado]: 'bg-emerald-100 text-emerald-800',
  [StudentStatus.Recuperacao]: 'bg-amber-100 text-amber-800',
  [StudentStatus.Reprovado]: 'bg-rose-100 text-rose-800',
  [StudentStatus.Indefinido]: 'bg-slate-100 text-slate-800',
};

const StudentRow: React.FC<StudentRowProps> = ({ student, onUpdateGrade, onUpdateAttendance, onDeleteStudent }) => {
  const handleGradeChange = (subject: string, value: string) => {
    const score = value === '' ? null : parseFloat(value);
    if (score === null || (!isNaN(score) && score >= 0 && score <= 10)) {
      onUpdateGrade(student.id, subject, score);
    }
  };

  const handleAttendanceChange = (value: string) => {
    const attendance = value === '' ? null : parseInt(value, 10);
    if (attendance === null || (!isNaN(attendance) && attendance >= 0 && attendance <= 100)) {
      onUpdateAttendance(student.id, attendance);
    }
  };

  const isFailedByAttendance = student.attendance !== null && student.attendance < MINIMUM_ATTENDANCE;

  const { average, status } = useMemo(() => {
    const validGrades = student.grades.filter(g => g.score !== null && g.score >= 0);
    
    const sum = validGrades.reduce((acc, g) => acc + g.score!, 0);
    const avg = validGrades.length > 0 ? sum / validGrades.length : null;

    if (student.attendance !== null && student.attendance < MINIMUM_ATTENDANCE) {
      return { average: avg, status: StudentStatus.Reprovado };
    }
    
    if (avg === null) {
      return { average: null, status: StudentStatus.Indefinido };
    }

    let currentStatus: StudentStatus;
    if (avg >= PASSING_GRADE) {
      currentStatus = StudentStatus.Aprovado;
    } else if (avg >= RECOVERY_GRADE) {
      currentStatus = StudentStatus.Recuperacao;
    } else {
      currentStatus = StudentStatus.Reprovado;
    }

    return { average: avg, status: currentStatus };
  }, [student.grades, student.attendance]);
  
  const attendanceInputClasses = [
    "w-20 text-center p-2 border rounded-md focus:ring-2 transition-colors duration-150",
    isFailedByAttendance
      ? "border-rose-300 bg-rose-50 text-rose-900 focus:border-rose-500 focus:ring-rose-500"
      : "border-slate-300 focus:border-indigo-500 focus:ring-indigo-500",
  ].join(" ");


  return (
    <tr className="hover:bg-slate-50 transition-colors duration-150">
      <td className="sticky left-0 bg-white hover:bg-slate-50 px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{student.name}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center justify-center">
          <input
            type="number"
            min="0"
            max="100"
            value={student.attendance ?? ''}
            onChange={e => handleAttendanceChange(e.target.value)}
            className={attendanceInputClasses}
            placeholder="-"
            aria-label={`Frequência de ${student.name}`}
            aria-invalid={isFailedByAttendance}
          />
          <span className="ml-2 font-medium text-slate-500">%</span>
        </div>
      </td>
      {student.grades.map(grade => (
        <td key={grade.subject} className="px-6 py-4 whitespace-nowrap">
          <input
            type="number"
            step="0.1"
            min="0"
            max="10"
            value={grade.score ?? ''}
            onChange={e => handleGradeChange(grade.subject, e.target.value)}
            className="w-20 text-center p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="-"
          />
        </td>
      ))}
      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-slate-500 font-semibold">
        {average !== null ? average.toFixed(1) : '-'}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyles[status]}`}>
          {status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
        <button
          onClick={() => onDeleteStudent(student)}
          className="text-slate-400 hover:text-rose-600 transition-colors duration-150 p-2 rounded-full hover:bg-rose-100"
          aria-label={`Excluir ${student.name}`}
        >
          <TrashIcon className="w-5 h-5" />
        </button>
      </td>
    </tr>
  );
};

export default StudentRow;