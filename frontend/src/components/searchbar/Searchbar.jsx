import React from "react";

export function Searchbar(props) {
  const { onChange, student, setStudent } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    onChange(student);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        id="Search"
        type="text"
        placeholder="Buscar alumno..."
        value={student}
        onChange={(e) => setStudent(e.target.value)}
      />
    </form>
  );
}
