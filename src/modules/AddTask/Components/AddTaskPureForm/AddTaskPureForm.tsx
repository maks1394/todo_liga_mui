import { observer } from 'mobx-react';
import { ChangeEvent } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { validationSchema } from './AddTaskPureForm.validation';
import { AddTaskStoreInstance } from 'modules/index';
import { AddTaskEntity } from 'domains/index';
import { BlockButton } from 'components/index';

function AddTaskPureFormProto() {
  const { handleSubmit, control, setValue, formState, clearErrors } = useForm<AddTaskEntity>({
    defaultValues: AddTaskStoreInstance.defaultValues,
    resolver: yupResolver(validationSchema),
  });
  const navigate = useNavigate();
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
  const onSubmit = async (data: AddTaskEntity) => {
    try {
      await AddTaskStoreInstance.addTask(data);
      navigate('/');
    } catch (error) {
      AddTaskStoreInstance.pushError((error as Error).message);
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
              control={<Checkbox checked={field.value} onChange={onImportantChange} />}
              label="is important"
            />
          )}
        />
        <BlockButton type="submit">Add task</BlockButton>
      </Stack>
    </>
  );
}

export const AddTaskPureForm = observer(AddTaskPureFormProto);
