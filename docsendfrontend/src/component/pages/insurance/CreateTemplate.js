import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Include Quill styles

const CreateTemplate = () => {
  const [templateContent, setTemplateContent] = useState('');
  const quillRef = useRef(null);

  const modules = {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'], // toggled buttons
        ['blockquote', 'code-block'],

        [{ 'header': 1 }, { 'header': 2 }], // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }], // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }], // outdent/indent
        [{ 'direction': 'rtl' }], // text direction

        [{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }], // dropdown with defaults
        [{ 'font': [] }],
        [{ 'align': [] }],

        ['clean'], // remove formatting
      ],
    },
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video',
  ];

  const handleContentChange = (content) => {
    setTemplateContent(content);
  };

  const insertDynamicField = (field) => {
    const quillEditor = quillRef.current.getEditor();
    const range = quillEditor.getSelection();
    let position = range ? range.index : 0;
    quillEditor.insertText(position, field);
  };
// Style for the editor to have a default height equivalent to 12 lines
const editorStyle = {
    minHeight: '400px', // Adjust as needed for approximately 12 rows
  };

  return (
    <div className="flex gap-4 p-6 bg-white rounded-lg shadow-lg max-w-7xl mx-auto">
      <div className="flex-1">
        <h1 className="text-xl font-bold mb-4">Create Template</h1>
        
        <ReactQuill
          ref={quillRef}
          value={templateContent}
          onChange={handleContentChange}
          modules={modules}
          formats={formats}
          style={editorStyle}
          bounds={'.app'}
          placeholder="Compose your template here..."
          rowHeight={20}
        />
        <div className="flex justify-end mt-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
            Save Template
          </button>
        </div>
      </div>
      
      <div className="w-64">
        {/* This is the sidebar for dynamic fields */}
        <div className="sticky top-0 p-4 bg-gray-100 rounded-lg">
          <h2 className="font-semibold mb-2">Dynamic Fields</h2>
          <ul>
            {/* List your dynamic fields here */}
            <li>
              <button onClick={() => insertDynamicField('@agentName')}>
                @agentName
              </button>
            </li>
            <li>
              <button onClick={() => insertDynamicField('@customerName')}>
                @customerName
              </button>
            </li>
            <li>
              <button onClick={() => insertDynamicField('@customerEmail')}>
                @customerEmail
              </button>
            </li>
            <li>
              <button onClick={() => insertDynamicField('@customerAddress')}>
                @customerAddress
              </button>
              </li>
                <li>
                <button onClick={() => insertDynamicField('@customerCity')}>
                @customerCity
                </button>
                </li>
                <li>
                <button onClick={() => insertDynamicField('@customerState')}>
                @customerState
                </button>
                </li>
                <li>
                <button onClick={() => insertDynamicField('@customerZip')}>
                @customerZip
                </button>
                </li>
                <li>
                <button onClick={() => insertDynamicField('@customerPhone')}>
                @customerPhone
                </button>
                </li>
                <li>
                <button onClick={() => insertDynamicField('@customerDOB')}>
                @customerDOB
                </button>
                </li>
                <li>
                <button onClick={() => insertDynamicField('@customerSSN')}>
                @customerSSN
                </button>
                </li>
                <li>
                <button onClick={() => insertDynamicField('@customerDL')}>
                @customerDL
                </button>
                </li>
                <li>
                <button onClick={() => insertDynamicField('@customerDLState')}>
                @customerDLState
                </button>
                </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CreateTemplate;