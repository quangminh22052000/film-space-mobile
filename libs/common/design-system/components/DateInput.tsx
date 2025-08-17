import { useEffect, useState } from "react"

import { TextInput } from "./TextInput"

function escapeForRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

export const DateInput = ({
  onChangeText,
  onChange,
  value,
  disabled,
  dateFormat: mask,
  ...rest
}: React.ComponentProps<typeof TextInput> & {
  dateFormat: string
}) => {
  const [controlledValue, setControlledValue] = useState<string>(value || "")
  const onInnerChange = (text: string) => {
    const splitCharacter = "/"
    const maskParts = mask.split(splitCharacter)

    let trimmedText = text.trim()
    const format =
      maskParts[0].toLowerCase() +
      splitCharacter +
      maskParts[1].toLowerCase() +
      splitCharacter +
      maskParts[2].toLowerCase()
    const match = new RegExp(
      format
        .replace(/(\w+)\W(\w+)\W(\w+)/, "^\\s*($1)\\W*($2)?\\W*($3)?([0-9]*).*")
        .replace(/m|d|y/g, "\\d"),
    )
    const replaceValue = format.match(/\W/)
    const replace = `$1${splitCharacter}$2${splitCharacter}$3$4`.replace(
      new RegExp(escapeForRegExp(splitCharacter), "g"),
      (replaceValue ?? "") as string,
    )

    const isBackSpace = controlledValue.length > trimmedText.length

    if (!isBackSpace) {
      trimmedText = trimmedText
        .replace(/(^|\W)(?=\d\W)/g, "$10")
        .replace(match, replace)
        .replace(/(\W)+/g, "$1")
    }

    if (trimmedText.length === mask.length) {
      if (onChangeText) {
        onChangeText(trimmedText)
      }
    }

    setControlledValue(trimmedText)
  }

  useEffect(() => {
    setControlledValue(value || "")
  }, [value])

  return (
    <TextInput
      {...rest}
      disabled={disabled}
      value={controlledValue}
      keyboardType="numeric"
      onChangeText={onInnerChange}
      onChange={e => {
        if (onChange) {
          onChange(e)
        }
      }}
      maxLength={10}
    />
  )
}
