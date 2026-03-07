import { useState, type InputHTMLAttributes } from 'react';
import './HeroInlineSearch.css';

export interface HeroInlineSearchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Placeholder text shown when the input is empty */
  placeholder?: string;
}

export default function HeroInlineSearch({
  placeholder = 'Search by keywords, e.g. Software Engineer, Amman..',
  className,
  onChange,
  value: controlledValue,
  defaultValue,
  ...rest
}: HeroInlineSearchProps) {
  const [internalValue, setInternalValue] = useState(defaultValue ?? '');
  const isControlled = controlledValue !== undefined;
  const hasValue = isControlled ? String(controlledValue).length > 0 : String(internalValue).length > 0;

  const rootClass = [
    'hero-inline-search',
    hasValue ? 'hero-inline-search--has-value' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={rootClass}>
      <input
        type="text"
        className="hero-inline-search__input"
        placeholder={placeholder}
        value={isControlled ? controlledValue : undefined}
        defaultValue={isControlled ? undefined : defaultValue}
        onChange={(e) => {
          if (!isControlled) setInternalValue(e.target.value);
          onChange?.(e);
        }}
        {...rest}
      />
    </div>
  );
}
