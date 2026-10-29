import { useRef, useState } from "react";

export function useEditableRow(initialName?: string) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(initialName);
  return { inputRef, isEditing, setIsEditing, name, setName };
}
