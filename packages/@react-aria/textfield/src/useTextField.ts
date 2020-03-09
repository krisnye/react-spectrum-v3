/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {ChangeEvent, InputHTMLAttributes, LabelHTMLAttributes} from 'react';
import {TextFieldProps} from '@react-types/textfield';
import {TextInputDOMProps} from '@react-types/shared';
import {useFocusable} from '@react-aria/focus';
import {useLabel} from '@react-aria/label';

interface TextFieldAriaProps extends TextFieldProps, TextInputDOMProps {}
interface TextFieldAria {
  /** Props for the input element */
  inputProps: InputHTMLAttributes<HTMLInputElement & HTMLTextAreaElement>
  /** Props for the text field's visible label element (if any) */
  labelProps: LabelHTMLAttributes<HTMLLabelElement>,
}

/**
 * Provides the behavior and accessibility implementation for a text field.
 * @param props - props for the text field
 */
export function useTextField(props: TextFieldAriaProps): TextFieldAria {
  let {
    isDisabled = false,
    isRequired = false,
    isReadOnly = false,
    autoFocus = false,
    validationState,
    type = 'text',
    onChange = () => {}
  } = props;
  let {focusableProps} = useFocusable(props);
  let {labelProps, fieldProps} = useLabel(props);

  return {
    labelProps,
    inputProps: {
      type,
      disabled: isDisabled,
      readOnly: isReadOnly,
      'aria-required': isRequired || undefined,
      'aria-invalid': validationState === 'invalid' || undefined,
      onChange: (e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value),
      autoFocus,
      autoComplete: props.autoComplete,
      maxLength: props.maxLength,
      minLength: props.minLength,
      name: props.name,
      pattern: props.pattern,
      placeholder: props.placeholder,
      inputMode: props.inputMode,

      // Clipboard events
      onCopy: props.onCopy,
      onCut: props.onCut,
      onPaste: props.onPaste,

      // Composition events
      onCompositionEnd: props.onCompositionEnd,
      onCompositionStart: props.onCompositionStart,
      onCompositionUpdate: props.onCompositionUpdate,

      // Selection events
      onSelect: props.onSelect,

      // Input events
      onBeforeInput: props.onBeforeInput,
      onInput: props.onInput,
      ...focusableProps,
      ...fieldProps
    }
  };
}
