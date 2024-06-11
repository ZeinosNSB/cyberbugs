import { Editor } from '@tinymce/tinymce-react'

function EditorCustom({ data, handleChange, name, height, width }) {
  return (
    <Editor
      apiKey='xioemkmdlxsadn0uku2zmyb2vvcvprt4x37wotzhaf6purql'
      value={data}
      onEditorChange={value => handleChange(value, name)}
      init={{
        height: height || 300,
        width: width || '95%',
        menubar: false,
        initialValue: '',
        plugins: [
          'advlist',
          'anchor',
          'autolink',
          'help',
          'image',
          'link',
          'lists',
          'searchreplace',
          'table',
          'wordcount'
        ],
        toolbar:
          'undo redo | blocks | ' +
          'bold italic forecolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | help',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        license_key: 'gpl'
      }}
    />
  )
}

export default EditorCustom
