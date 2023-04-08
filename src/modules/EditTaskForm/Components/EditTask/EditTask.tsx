import { observer } from 'mobx-react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { validationSchema } from './editTask.validation';
import { EditTaskStoreInstance } from 'modules/index';
import { EditTaskEntity } from 'domains/index';
import { BlockButton } from 'components/index';

function EditTaskProto() {
  const { handleSubmit, control, setValue, getValues, formState, clearErrors } = useForm<EditTaskEntity>({
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
    try {
      await EditTaskStoreInstance.editTask(data);
      navigate('/');
    } catch (error) {
      EditTaskStoreInstance.pushError((error as Error).message);
    }
  };
  return (
    <>
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="stretch"
        spacing={1}
        component={'form'}
        onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="title"
          render={({ field, fieldState: { error } }) => (
            <TextField
              label="Title of task"
              value={field.value}
              onChange={onTitleChange}
              error={!!error?.message}
              type="text"
              helperText={error?.message}
              fullWidth
            />
          )}
        />
        <Controller
          control={control}
          name="info"
          render={({ field, fieldState: { error } }) => (
            <TextField
              label="Information"
              value={field.value}
              onChange={onInfoChange}
              error={!!error?.message}
              helperText={error?.message}
              type="text"
              fullWidth
            />
          )}
        />
        <Controller
          control={control}
          name="important"
          render={({ field, fieldState: { error } }) => (
            <FormControlLabel
              control={<Checkbox checked={field.value} onChange={onImportantChange} disabled={isImportantDisable} />}
              label="is important"
            />
          )}
        />
        <Controller
          control={control}
          name="completed"
          render={({ field, fieldState: { error } }) => (
            <FormControlLabel
              control={<Checkbox checked={field.value} onChange={onCompletedChange} />}
              label="is completed"
            />
          )}
        />
        <BlockButton type="submit">Edit task</BlockButton>
      </Stack>
    </>
  );
}

export const EditTask = observer(EditTaskProto);
