import React, { useState } from 'react';
import { PlusIcon } from './icons/PlusIcon';

interface StudentFormProps {
  onAddStudent: (name: string) => void;
}

const StudentForm: React.FC<StudentFormProps> = ({ onAddStudent }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddStudent(name);
    setName('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-4">
      <label htmlFor="studentName" className="sr-only">Nome do Aluno</label>
      <input
        id="studentName"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Digite o nome do novo aluno..."
        className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
        required
      />
      <button
        type="submit"
        className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
      >
        <PlusIcon className="w-5 h-5" />
        <span>Adicionar Aluno</span>
      </button>
    </form>
  );
};

export default StudentForm;
