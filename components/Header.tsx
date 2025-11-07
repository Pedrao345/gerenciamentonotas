import React from 'react';
import { GraduationCapIcon } from './icons/GraduationCapIcon';

interface HeaderProps {
  selectedClassroomName?: string;
}

const Header: React.FC<HeaderProps> = ({ selectedClassroomName }) => {
  return (
    <header className="text-center mb-8 md:mb-12">
      <div className="flex items-center justify-center gap-4">
        <GraduationCapIcon className="w-10 h-10 text-indigo-600"/>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
          Gerenciador de Notas {selectedClassroomName && <span className="text-indigo-600">| {selectedClassroomName}</span>}
        </h1>
      </div>
      <p className="mt-2 text-lg text-slate-600">
        Selecione a turma, adicione alunos e insira suas notas para acompanhar o desempenho.
      </p>
    </header>
  );
};

export default Header;