import React, { useState, useCallback, useMemo } from 'react';
import { Student, Classroom } from './types';
import { SUBJECTS } from './constants';
import Header from './components/Header';
import StudentForm from './components/StudentForm';
import StudentTable from './components/StudentTable';
import Modal from './components/Modal';
import ClassroomSelector from './components/ClassroomSelector';

const initialClassrooms: Classroom[] = [
  { id: 'turma-a', name: 'Turma A' },
  { id: 'turma-b', name: 'Turma B' },
  { id: 'turma-c', name: 'Turma C' },
];

const App: React.FC = () => {
  const [classrooms] = useState<Classroom[]>(initialClassrooms);
  const [selectedClassroomId, setSelectedClassroomId] = useState<string>(initialClassrooms[0].id);
  
  const [students, setStudents] = useState<Student[]>(() => {
    // Initial sample data
    const initialSubjects = SUBJECTS.map(subject => ({ subject, score: null }));
    return [
      { id: crypto.randomUUID(), name: 'Ana Silva', grades: initialSubjects.map(g => ({...g, score: Math.floor(Math.random() * 5) + 6 })), attendance: 95, classroomId: 'turma-a' },
      { id: crypto.randomUUID(), name: 'Bruno Costa', grades: initialSubjects.map(g => ({...g, score: Math.floor(Math.random() * 4) + 3 })), attendance: 80, classroomId: 'turma-a' },
      { id: crypto.randomUUID(), name: 'Carla Dias', grades: initialSubjects.map(g => ({...g, score: Math.floor(Math.random() * 3) + 4 })), attendance: 70, classroomId: 'turma-a' },
      { id: crypto.randomUUID(), name: 'Daniel Alves', grades: initialSubjects.map(g => ({...g, score: Math.floor(Math.random() * 6) + 5 })), attendance: 90, classroomId: 'turma-b' },
      { id: crypto.randomUUID(), name: 'Elisa Ferreira', grades: initialSubjects.map(g => ({...g, score: Math.floor(Math.random() * 2) + 8 })), attendance: 100, classroomId: 'turma-b' },
    ];
  });
  
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);

  const addStudent = useCallback((name: string) => {
    if (name.trim() === '') return;
    const newStudent: Student = {
      id: crypto.randomUUID(),
      name,
      grades: SUBJECTS.map(subject => ({ subject, score: null })),
      attendance: 100,
      classroomId: selectedClassroomId,
    };
    setStudents(prevStudents => [...prevStudents, newStudent]);
  }, [selectedClassroomId]);

  const updateStudentGrade = useCallback((studentId: string, subject: string, score: number | null) => {
    setStudents(prevStudents =>
      prevStudents.map(student =>
        student.id === studentId
          ? {
              ...student,
              grades: student.grades.map(grade =>
                grade.subject === subject ? { ...grade, score } : grade
              ),
            }
          : student
      )
    );
  }, []);

  const updateStudentAttendance = useCallback((studentId: string, attendance: number | null) => {
    setStudents(prevStudents =>
      prevStudents.map(student =>
        student.id === studentId ? { ...student, attendance } : student
      )
    );
  }, []);

  const deleteStudent = useCallback((studentId: string) => {
    setStudents(prevStudents => prevStudents.filter(student => student.id !== studentId));
    setStudentToDelete(null);
  }, []);

  const filteredStudents = useMemo(() => {
    return students.filter(student => student.classroomId === selectedClassroomId);
  }, [students, selectedClassroomId]);

  const selectedClassroomName = useMemo(() => {
    return classrooms.find(c => c.id === selectedClassroomId)?.name;
  }, [classrooms, selectedClassroomId]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <Header selectedClassroomName={selectedClassroomName} />
        <main>
          <div className="bg-white p-6 rounded-xl shadow-md mb-8">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Painel de Gerenciamento</h2>
            <ClassroomSelector 
              classrooms={classrooms}
              selectedClassroomId={selectedClassroomId}
              onClassroomChange={setSelectedClassroomId}
            />
            <hr className="my-6 border-slate-200" />
            <StudentForm onAddStudent={addStudent} />
          </div>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
             <StudentTable 
                students={filteredStudents} 
                onUpdateGrade={updateStudentGrade} 
                onUpdateAttendance={updateStudentAttendance}
                onDeleteStudent={(student) => setStudentToDelete(student)} 
              />
          </div>
        </main>
      </div>
      {studentToDelete && (
        <Modal
          isOpen={!!studentToDelete}
          onClose={() => setStudentToDelete(null)}
          onConfirm={() => deleteStudent(studentToDelete.id)}
          title="Confirmar Exclusão"
          message={`Tem certeza que deseja excluir o aluno(a) ${studentToDelete.name}? Esta ação não pode ser desfeita.`}
        />
      )}
    </div>
  );
};

export default App;