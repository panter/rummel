import {
  Control,
  FieldArray,
  FieldArrayPath,
  FieldArrayWithId,
  FieldValues,
  useFieldArray,
} from 'react-hook-form';
import { useList } from 'react-use';

export type UploadingFile = {
  id?: string;
  file: File;
  progress?: number;
  error?: Error;
};

export type UploadedFile = {
  id: string;
  name: string;
  mimeType: string;
  size: number;
  publicUrl?: string;
};

export const useUploadFieldArray = <
  TFieldValues extends FieldValues = FieldValues,
  TFieldArrayName extends
    FieldArrayPath<TFieldValues> = FieldArrayPath<TFieldValues>,
  TKeyName extends string = '_id',
>({
  name,
  control,
  assetToInput,
  uploader,
}: {
  name: TFieldArrayName;
  control?: Control<TFieldValues> | undefined;
  assetToInput: (props: {
    field?: FieldArrayWithId<TFieldValues, TFieldArrayName, TKeyName>;
    file?: UploadedFile;
  }) => FieldArray<TFieldValues, TFieldArrayName>;
  uploader: (p: {
    file: File;
    field?: FieldArrayWithId<TFieldValues, TFieldArrayName, TKeyName>;
  }) => Promise<UploadedFile>;
}) => {
  const [currentUploads, { push: pushNew, removeAt: removeNewAt }] =
    useList<UploadingFile>();
  const [currentUpdates, { push: pushUpdate, removeAt: removeUpdateAt }] =
    useList<UploadingFile>();
  const { fields, append, remove, update } = useFieldArray({
    control: control,
    name,
    keyName: '_id',
  });

  const updateFile = (
    index: number,
    field: FieldArrayWithId<TFieldValues, TFieldArrayName, TKeyName>,
    f?: FileList | null,
  ) => {
    const files = Array.from(f || []);
    const file = files[0];

    const uploadFile = { file };
    pushUpdate(uploadFile);

    if (file) {
      uploader({ file, field }).then((uploadedAsset) => {
        removeUpdateAt(currentUpdates.indexOf(uploadFile));
        update(index, assetToInput({ field, file: uploadedAsset }));
      });
    }
  };

  const uploadFiles = (fileList: FileList) => {
    const newFiles = Array.from(fileList || []).map((file) => {
      const uploadFile = { file };
      uploader({ file }).then((uploadedAsset) => {
        removeNewAt(currentUploads.indexOf(uploadFile));
        append(assetToInput({ file: uploadedAsset }));
      });
      return uploadFile;
    });
    pushNew(...newFiles);
  };

  return {
    update,
    updateFile,
    uploadFiles,
    currentUpdates,
    currentUploads,
    fields: fields as FieldArrayWithId<TFieldValues, TFieldArrayName, '_id'>[],
    remove,
  };
};
