import { useState, useRef } from "react";
import { FaTimes } from "react-icons/fa";

const InputCategories = ({ tags, setTags }) => {
  const tagInput = useRef("");

  const onPressed = (e) => {
    const name = e.target.value;
    const [r, g, b] = [rgbRand(), rgbRand(), rgbRand()];
    const borderColor = `rgb(${r}, ${g}, ${b})`;
    const bgColor = `rgba(${r}, ${g}, ${b}, 0.1)`;

    if (e.key === "Tab" && name) {
      // Check if tag already exists
      if (tags.find((tag) => tag.name.toLowerCase() === name.toLowerCase())) {
        return;
      }

      setTags([...tags, { name, borderColor, bgColor }]);
      tagInput.current.value = "";
    }
  };

  const deleteTag = (i) => {
    const slicedTags = [...tags];
    slicedTags.splice(i, 1);

    setTags(slicedTags);
  };

  const rgbRand = () => {
    return Math.floor(Math.random() * 250);
  };

  return (
    <div>
      <input
        id='categoryInput'
        type='text'
        placeholder='Categoria (TAB para adicionar)'
        onKeyDown={onPressed}
        ref={tagInput}
      />
      <ul className='tag-container'>
        {tags.map((tag, i) => (
          <li key={tag.name} className='tag'>
            {tag.name}
            <FaTimes onClick={() => deleteTag(i)} className='tag-delete' />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InputCategories;
