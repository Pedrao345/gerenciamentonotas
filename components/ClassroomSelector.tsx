import React from 'react';
import { Classroom } from '../types';

interface ClassroomSelectorProps {
  classrooms: Classroom[];
  selectedClassroomId: string;
  onClassroomChange: (classroomId: string) => void;
}

const ClassroomSelector: React.FC<ClassroomSelectorProps> = ({ classrooms, selectedClassroomId, onClassroomChange }) => {
  return (
    <div>
      <label htmlFor="classroom-select" className="block text-sm font-medium text-slate-700 mb-2">
        Selecione a Turma
      </label>
      <select
        id="classroom-select"
        value={selectedClassroomId}
        onChange={(e) => onClassroomChange(e.target.value)}
        className="w-full max-w-xs px-4 py-3 border border-slate-300 bg-white rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
      >
        {classrooms.map((classroom) => (
          <option key={classroom.id} value={classroom.id}>
            {classroom.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ClassroomSelector;
