import React from 'react';
import { Student } from '../types';
import { SUBJECTS } from '../constants';
import StudentRow from './StudentRow';

interface StudentTableProps {
  students: Student[];
  onUpdateGrade: (studentId: string, subject: string, score: number | null) => void;
  onUpdateAttendance: (studentId: string, attendance: number | null) => void;
  onDeleteStudent: (student: Student) => void;
}

const StudentTable: React.FC<StudentTableProps> = ({ students, onUpdateGrade, onUpdateAttendance, onDeleteStudent }) => {
  if (students.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-xl font-semibold text-slate-700">Nenhum aluno cadastrado</h3>
        <p className="text-slate-500 mt-2">Use o formulário acima para começar a adicionar alunos.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-100">
          <tr>
            <th scope="col" className="sticky left-0 bg-slate-100 px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Aluno</th>
            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">Frequência</th>
            {SUBJECTS.map(subject => (
              <th key={subject} scope="col" className="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">{subject}</th>
            ))}
            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">Média</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Situação</th>
            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">Ações</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-slate-200">
          {students.map(student => (
            <StudentRow 
              key={student.id} 
              student={student} 
              onUpdateGrade={onUpdateGrade}
              onUpdateAttendance={onUpdateAttendance}
              onDeleteStudent={onDeleteStudent} 
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;