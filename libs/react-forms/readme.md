# React Forms

## Installation

You can install Prisma Inputs using npm or yarn:

```shell
yarn add @panter/react-forms
```

### ! Important NOTE !

This package is `not transpiled` jet.
If you want to use it with next js you need to add this to your `next.config.js`:

```js
const nextConfig = {
  transpilePackages: ["@panter/react-forms"]
  ...
}
```

# Documentation

## useUploadFieldArray
The useUploadFieldArray custom hook is designed to integrate with React Hook Form's useFieldArray for managing the state of file uploads within a dynamic form array. This hook simplifies handling file uploads, including tracking upload progress, updating file information in the form, and removing files. It's particularly useful when you have a form that allows users to upload multiple files, and you need to keep the form state in sync with those uploads.

## Parameters
The hook accepts an object with the following properties:

- name: The name of the field array in the form. This corresponds to the field array you're managing with React Hook Form.
- control: An optional control object from React Hook Form. This is used to control the form's state.
- assetToInput: A function that transforms the uploaded file information or existing field data into the format expected by the form array. This function takes an object with an optional field (the current field data) and an optional file (the uploaded file data) and returns an object that can be used to update the form array.
- uploader: A function that uploads the file.

## Returns
The hook returns an object containing several properties and functions for managing file uploads:

- update: A function to update a specific field in the field array.
- updateFile: A function to handle updating the file for a specific field in the array. It takes the index of the field to update, the field data, and an optional FileList object. If a file is provided, it will be uploaded, and the field will be updated with the new file data.
- uploadFiles: A function to handle uploading new files. It takes a FileList object, uploads the files, and appends the new file data to the form array.
- currentUpdates: An array of objects representing the files currently being uploaded or updated. This can be used to display upload progress or status.
- currentUploads: An array of objects representing the new files currently being uploaded. Similar to currentUpdates, this can be used to track the progress of new file uploads.
- fields: An array of field data, similar to what is returned by React Hook Form's useFieldArray, but specifically tailored to include the _id key for tracking.
- remove: A function to remove a specific field from the field array.

## Usage
This hook is particularly useful in scenarios where you need to upload files as part of a form and maintain the state of those uploads within a dynamic array. It abstracts away the complexity of handling file uploads, progress tracking, and state updates, making it easier to integrate file uploads into your forms with React Hook Form.

Here's a simplified example of how you might use useUploadFieldArray in a component:

```jsx
const MyFormComponent = () => {
  const { control } = useForm();
  const {
    fields,
    uploadFiles,
    updateFile,
    remove,
  } = useUploadFieldArray({
    name: "myFiles",
    control,
    assetToInput: ({ file }) => ({
      // Transform the uploaded file into the format expected by your form
      id: file.id,
      url: file.url,
      // Add any additional transformation logic here
    }),
    uploader: ({file}) => upload(file)
  });

  return (
    <form>
      {fields.map((field, index) => (
        <div key={field.id}>
          {/* Render your file input or preview component here */}
          <button type="button" onClick={() => remove(index)}>Remove</button>
        </div>
      ))}
      <input
        type="file"
        multiple
        onChange={(e) => uploadFiles(e.target.files)}
      />
    </form>
  );
};
```
