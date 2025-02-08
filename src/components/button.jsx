export function Button({ text, onClick, variant }) {
  const handleVariant = () => {
    if (variant === "a") {
      return "bg-red-500";
    } else if (variant === "b") {
      return "bg-yellow-500";
    } else {
      return "bg-gray-500";
    }

    console.log("halodunia");
  };

  return (
    <button onClick={onClick} className={`${handleVariant()}`}>
      {text}
    </button>
  );
}
