import { Form as AntdForm } from 'antd'
import { Children, cloneElement, isValidElement, useEffect } from 'react'
import { useController } from 'react-hook-form'

export const FormItem = ({
  children,
  control,
  name,
  disabled,
  help,
  valuePropName,
  ...props
}) => {
  const { field, fieldState } = useController({ name, control, disabled })
  const form = AntdForm.useFormInstance()

  useEffect(() => {
    form.setFieldValue(name, field.value)
  }, [field.value, form, name])

  return (
    <AntdForm.Item
      {...props}
      name={name}
      initialValue={field.value}
      validateStatus={fieldState.invalid ? 'error' : undefined}
      help={fieldState.error?.message ?? help}
    >
      {Children.map(
        children,
        child =>
          isValidElement(child) &&
          cloneElement(child, {
            ...field,
            onChange: (...params) => {
              child.props.onChange && child.props.onChange(...params)
              field.onChange(...params)
            },
            onBlur: () => {
              child.props.onBlur && child.props.onBlur()
              field.onBlur()
            },
            ...(valuePropName && {
              [valuePropName]: field.value
            })
          })
      )}
    </AntdForm.Item>
  )
}
