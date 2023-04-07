import { observer } from 'mobx-react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { ChangeEvent, MouseEventHandler, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validationSchema } from './editTask.validation';
import { EditTaskStoreInstance } from 'modules/index';
import { EditTaskEntity } from 'domains/index';
import { TextField } from 'components/TextField';
import { Checkbox } from 'components/Checkbox';
import { BlockButton } from 'components/index';

function EditTaskProto() {
  const { handleSubmit, reset, control, setValue, getValues, formState, clearErrors } = useForm<EditTaskEntity>({
    defaultValues: EditTaskStoreInstance.defaultValues,
    resolver: yupResolver(validationSchema),
  });
  const navigate = useNavigate();
  const [isImportantDisable, setIsImportantDisable] = useState(getValues().completed);
  const onTitleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (formState.errors.title) {
      clearErrors('title');
    }
    setValue('title', evt.target.value);
  };
  const onInfoChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (formState.errors.info) {
      clearErrors('info');
    }
    setValue('info', evt.target.value);
  };
  const onImportantChange = (evt: ChangeEvent<HTMLInputElement>) => setValue('important', evt.target.checked);
  const onCompletedChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setValue('completed', evt.target.checked);
    if (evt.target.checked) {
      setIsImportantDisable(true);
    } else {
      setIsImportantDisable(false);
    }
  };
  const onSubmit = async (data: EditTaskEntity) => {
    console.log(data);
    try {
      await EditTaskStoreInstance.editTask(data);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };
  const onEditClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleSubmit(onSubmit)();
  };
  // useEffect(() => {}, [getValues().completed]);
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="title"
          render={({ field, fieldState: { error } }) => (
            <div>
              <TextField
                label="Title of task:"
                value={field.value}
                onChange={onTitleChange}
                errorText={error?.message}
                inputType="text"
                placeholder="Task title"
              />
            </div>
          )}
        />
        <Controller
          control={control}
          name="info"
          render={({ field, fieldState: { error } }) => (
            <div>
              <TextField
                label="Information:"
                value={field.value}
                onChange={onInfoChange}
                errorText={error?.message}
                inputType="text"
                placeholder="Information about task"
              />
            </div>
          )}
        />
        <Controller
          control={control}
          name="important"
          render={({ field, fieldState: { error } }) => (
            <div>
              <Checkbox
                label="is important"
                checked={field.value}
                onChange={onImportantChange}
                disabled={isImportantDisable}
              />
              <div className="invalid-feedback">{error?.message}</div>
            </div>
          )}
        />
        <Controller
          control={control}
          name="completed"
          render={({ field, fieldState: { error } }) => (
            <div>
              <Checkbox label="is completed" checked={field.value} onChange={onCompletedChange} />
              <div className="invalid-feedback">{error?.message}</div>
            </div>
          )}
        />
        <BlockButton>Edit task</BlockButton>
      </form>
    </>
  );
}

export const EditTask = observer(EditTaskProto);
