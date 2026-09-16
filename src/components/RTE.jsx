import React from 'react'
import {Editor} from '@tinymce/tinymce-react'
import {Controller} from 'react-hook-form'
import conf from '../conf/conf'

export default function RTE({name, control, label, defaultValue=""}) {
  return (
    <div className='w-full'>
      {label && <label className='inline-block pl-1 mb-1'>{label}</label>}

      <Controller 
        name={name || "content"}
        control={control}
        render={({field}) => (
          <Editor 
            apiKey={conf.tinyApiKey}
            // apiKey="3bcm87ndpd34kmzxcul3lzzfb2mqrd7vag3lvzd3tz61c47b"
            initialValue={defaultValue}
            value={field.value}
            onEditorChange={field.onChange}
            init={{
              menubar: true,
              height: 500,
              plugins: [
                "lists",
                "link",
                "image",
                "table",
                "code",
                "wordcount"
              ],
              toolbar: "undo redo | blocks | " +
                "bold italic underline strikethrough | " +
                "alignleft aligncenter alignright | " +
                "bullist numlist | " +
                "link image table | " +
                "code wordcount",
              content_style: `body {
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.6;
                padding: 10px;
                }`
            }}
          />
        )}
      />
    </div>
  )
}
