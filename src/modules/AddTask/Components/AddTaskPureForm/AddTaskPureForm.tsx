import { observer } from 'mobx-react';
import { ChangeEvent } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { validationSchema } from './AddTaskPureForm.validation';
import { AddTaskStoreInstance } from 'modules/index';
import { TextField } from 'components/TextField';
import { Checkbox } from 'components/Checkbox';
import { AddTaskEntity } from 'domains/index';
import { BlockButton } from 'components/index';

function AddTaskPureFormProto() {
  const { handleSubmit, reset, control, setValue, formState, clearErrors } = useForm<AddTaskEntity>({
    defaultValues: AddTaskStoreInstance.defaultValues,
    resolver: yupResolver(validationSchema),
  });
  const navigate = useNavigate();
  const onTitleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    console.log(formState.errors.title);
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
  const onSubmit = async (data: AddTaskEntity) => {
    console.log(data);
    try {
      await AddTaskStoreInstance.addTask(data);
      navigate('/');
    } catch (error) {
      AddTaskStoreInstance.pushError((error as Error).message);
    }
  };
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
              <Checkbox label="is important" checked={field.value} onChange={onImportantChange} />
              <div className="invalid-feedback">{error?.message}</div>
            </div>
          )}
        />
        <BlockButton disabled={AddTaskStoreInstance.status === 'loading'} type="submit">
          Add task
        </BlockButton>
      </form>
    </>
  );
}

export const AddTaskPureForm = observer(AddTaskPureFormProto);
