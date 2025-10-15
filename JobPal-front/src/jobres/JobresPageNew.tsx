import { Box, Button, Checkbox, Container, FormControl, FormControlLabel, FormLabel, Grid, MenuItem, Select, TextField, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import { FC, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';



import { useLoginUser } from '../_wheel/security/LoginUserProvider';
import { Authority } from '../common/types/AuthorityTypes';
import { JobresApi } from './JobresApi';


// 新規就職活動申請追加
export const JobresPageNew: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { getUserId } = useLoginUser();
  const { newJobres,editJobres } = JobresApi();


    // ページ遷移時に渡されたstateから初期値を設定
  // ログインユーザー情報取得
  const { getAuthority } = useLoginUser();
  const [jobresDetail, setJobresDetail] = useState(
    location.state?.jobresDetail || {
      companyName: null,
      industry: null,
      jobresPriority: null,
      companyLocation: null,
      representative: null,
      foundationDate: null,
      capital: null,
      sales: null,
      employeeCount: null,
      businessDetail: null,
      point: null,
      responseDetail: null,
      otherRemarks: null,
    }
  );

  // ユーザー詳細情報のステート
  // const [userDetail, setUserDetail] = useState<UserDetailParamsType>();

  // React Hook Formでフォーム状態を管理
  const { control, getValues, formState, watch, setValue } = useForm({
    defaultValues: {
      ...(location.state?.jobresDetail?.jobres?.jobresId && { jobresId: location.state.jobresDetail.jobres.jobresId }),
      companyName: location.state?.jobresDetail?.jobres.companyName ?? '',
      industry: location.state?.jobresDetail?.jobres.industry ?? '',
      jobresPriority: location.state?.jobresDetail?.jobres.jobresPriority ?? '',
      companyLocation: location.state?.jobresDetail?.companyLocation ?? '',
      representative: location.state?.jobresDetail?.representative ?? '',
      foundationDate: location.state?.jobresDetail?.foundationDate ?? '',
      capital: location.state?.jobresDetail?.capital ?? 0,
      sales: location.state?.jobresDetail?.sales ?? 0,
      employeeCount: location.state?.jobresDetail?.employeeCount ?? 0,
      businessDetail: location.state?.jobresDetail?.businessDetail ?? '',
      point: location.state?.jobresDetail?.point ?? '',
      responseDetail: location.state?.jobresDetail?.responseDetail ?? '',
      otherRemarks: location.state?.jobresDetail?.otherRemarks ?? '',
    },
    mode: 'all',
  });

  // ユーザー詳細情報を取得
  // useEffect(() => {
  // getUserDetail(getUserId(), setUserDetail);
  // }, []);

  // 新規申請処理
  const handleGoToJobResNew = async () => {
    const isEdit = !!location.state?.jobresDetail;

    console.log(location.state?.jobresDetail);
    const result = window.confirm('作成しますか？');
    if (result) {
      if (isEdit) {
        // 編集の場合
        // setValue('jobresId', jobresDetail.jobHuntId);
        console.log(getValues());
        await editJobres(getValues());
        navigate(`/jobres`);
      } else {
        await newJobres(getValues());
        navigate(`/jobres`);
      }
    }
  };

  return (
    <>
      <Container>
        <Typography gutterBottom sx={{ padding: { xs: '8px 0', sm: '16px 0' }, fontSize: { xs: '18px', sm: '20px' } }}>
          企業研究作成
        </Typography>
        <Grid container spacing={2} sx={{ padding: { xs: '20px 5px!important', sm: '20px 0 40px 20px' } }}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <FormLabel sx={{ fontSize: { xs: '13px', sm: '16px' } }}>会社名 (正式名称、省略不可)</FormLabel>
              <Controller
                control={control}
                name="companyName"
                rules={{ required: '会社名を入力してください' }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    placeholder="会社名"
                    size="small"
                    fullWidth
                    autoFocus
                    error={fieldState.error?.message !== undefined}
                    helperText={fieldState.error?.message}
                    sx={{
                      minWidth: 120,
                      '& .MuiInputBase-input': {
                        padding: '16px 14px !important',
                        fontSize: { xs: '13px', sm: '16px' },
                      },
                    }}
                  />
                )}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ padding: { xs: '20px 5px!important', sm: '20px 0 40px 20px' } }}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <FormLabel sx={{ fontSize: { xs: '13px', sm: '16px' }, marginBottom: { xs: '19px', sm: 0 } }}>
                業種
              </FormLabel>
              <Controller
                control={control}
                name="industry"
                rules={{ required: '業種を入力してください' }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    placeholder="業種"
                    size="small"
                    fullWidth
                    error={fieldState.error?.message !== undefined}
                    helperText={fieldState.error?.message}
                    sx={{
                      minWidth: 120,
                      '& .MuiInputBase-input': {
                        padding: '16px 14px !important',
                        fontSize: { xs: '13px', sm: '16px' },
                      },
                    }}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <FormLabel sx={{ fontSize: { xs: '13px', sm: '16px' } }}>企業優先度</FormLabel>
              <Controller
                control={control}
                name="jobresPriority"
                rules={{ required: '企業優先度を入力してください' }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    type="number"
                    placeholder="企業の優先度（数値）"
                    size="small"
                    fullWidth
                    error={fieldState.error?.message !== undefined}
                    helperText={fieldState.error?.message}
                    onChange={(e) => {
                      const value = Math.max(1, Math.min(10, Number(e.target.value)));
                      field.onChange(value);
                    }}
                    sx={{
                      minWidth: 120,
                      '& .MuiInputBase-input': {
                        padding: '16px 14px !important',
                        fontSize: { xs: '13px', sm: '16px' },
                      },
                    }}
                    inputProps={{
                      min: 1,
                      max: 10,
                    }}
                  />
                )}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ padding: { xs: '20px 5px!important', sm: '20px 0 40px 20px' } }}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <FormLabel sx={{ fontSize: { xs: '13px', sm: '16px' } }}>所在地</FormLabel>
              <Controller
                control={control}
                name="companyLocation"
                rules={{ required: '所在地を入力してください' }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    placeholder="所在地"
                    size="small"
                    fullWidth
                    error={fieldState.error?.message !== undefined}
                    helperText={fieldState.error?.message}
                    sx={{
                      minWidth: 120,
                      '& .MuiInputBase-input': {
                        padding: '16px 14px !important',
                        fontSize: { xs: '13px', sm: '16px' },
                      },
                    }}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <FormLabel sx={{ fontSize: { xs: '13px', sm: '16px' }, marginBottom: { xs: '19px', sm: 0 } }}>
                代表者
              </FormLabel>
              <Controller
                control={control}
                name="representative"
                rules={{ required: '代表者を入力してください' }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    placeholder="代表者"
                    size="small"
                    fullWidth
                    error={fieldState.error?.message !== undefined}
                    helperText={fieldState.error?.message}
                    sx={{
                      minWidth: 120,
                      '& .MuiInputBase-input': {
                        padding: '16px 14px !important',
                        fontSize: { xs: '13px', sm: '16px' },
                      },
                    }}
                  />
                )}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ padding: { xs: '10px 5px!important', sm: '20px 0 40px 20px' } }}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <FormLabel sx={{ fontSize: { xs: '13px', sm: '16px' } }}>設立年月日</FormLabel>
              <Controller
                control={control}
                name="foundationDate"
                rules={{ required: '設立年月日を入力してください' }}
                render={({ field, fieldState }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      value={field.value ? dayjs(field.value) : null}
                      onChange={(value: Dayjs | null) => {
                        const formattedValue = value ? value.format('YYYY-MM-DD') : null;
                        field.onChange(formattedValue);
                      }}
                    />
                    {fieldState.error && (
                      <Typography color="error" variant="caption">
                        {fieldState.error.message}
                      </Typography>
                    )}
                  </LocalizationProvider>
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <FormLabel sx={{ fontSize: { xs: '13px', sm: '16px' } }}>資本金</FormLabel>
              <Controller
                control={control}
                name="capital"
                rules={{ required: '資本金を入力してください' }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    type="number"
                    placeholder="資本金（数値）"
                    size="small"
                    fullWidth
                    error={fieldState.error?.message !== undefined}
                    helperText={fieldState.error?.message}
                    onChange={(e) => {
                      const value = Math.max(1, Number(e.target.value));
                      field.onChange(value);
                    }}
                    sx={{
                      minWidth: 120,
                      '& .MuiInputBase-input': {
                        padding: '16px 14px !important',
                        fontSize: { xs: '13px', sm: '16px' },
                      },
                    }}
                    inputProps={{
                      min: 1,
                    }}
                  />
                )}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ padding: { xs: '20px 5px!important', sm: '20px 0 40px 20px' } }}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <FormLabel sx={{ fontSize: { xs: '13px', sm: '16px' } }}>売上高</FormLabel>
              <Controller
                control={control}
                name="sales"
                rules={{ required: '売上高を入力してください' }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    type="number"
                    placeholder="売上高（数値）"
                    size="small"
                    fullWidth
                    error={fieldState.error?.message !== undefined}
                    helperText={fieldState.error?.message}
                    onChange={(e) => {
                      const value = Math.max(1, Number(e.target.value));
                      field.onChange(value);
                    }}
                    sx={{
                      minWidth: 120,
                      '& .MuiInputBase-input': {
                        padding: '16px 14px !important',
                        fontSize: { xs: '13px', sm: '16px' },
                      },
                    }}
                    inputProps={{
                      min: 1,
                    }}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <FormLabel sx={{ fontSize: { xs: '13px', sm: '16px' } }}>従業員数</FormLabel>
              <Controller
                control={control}
                name="employeeCount"
                rules={{ required: '従業員数を入力してください' }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    type="number"
                    placeholder="従業員数（数値）"
                    size="small"
                    fullWidth
                    error={fieldState.error?.message !== undefined}
                    helperText={fieldState.error?.message}
                    onChange={(e) => {
                      const value = Math.max(1, Number(e.target.value));
                      field.onChange(value);
                    }}
                    sx={{
                      minWidth: 120,
                      '& .MuiInputBase-input': {
                        padding: '16px 14px !important',
                        fontSize: { xs: '13px', sm: '16px' },
                      },
                    }}
                    inputProps={{
                      min: 1,
                    }}
                  />
                )}
              />
            </FormControl>
          </Grid>
        </Grid>
        <hr />
        <Grid container spacing={2} sx={{ padding: { xs: '20px 5px!important', sm: '20px 0 40px 20px' } }}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <FormLabel sx={{ fontSize: { xs: '13px', sm: '16px' } }}>事業内容</FormLabel>
              <Controller
                control={control}
                name="businessDetail"
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    size="small"
                    placeholder="事業内容"
                    fullWidth
                    multiline
                    rows={4}
                    sx={{
                      '& .MuiInputBase-input': {
                        fontSize: { xs: '13px', sm: '16px' },
                      },
                    }}
                  />
                )}
              />
            </FormControl>
          </Grid>
        </Grid>
        <hr />
        <Grid container spacing={2} sx={{ padding: { xs: '20px 5px!important', sm: '20px 0 40px 20px' } }}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <FormLabel sx={{ fontSize: { xs: '13px', sm: '16px' } }}>気になった点</FormLabel>
              <Controller
                control={control}
                name="point"
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    size="small"
                    placeholder="気になった点"
                    fullWidth
                    multiline
                    rows={4}
                    sx={{
                      '& .MuiInputBase-input': {
                        fontSize: { xs: '13px', sm: '16px' },
                      },
                    }}
                  />
                )}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ padding: { xs: '20px 5px!important', sm: '20px 0 40px 20px' } }}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <FormLabel sx={{ fontSize: { xs: '13px', sm: '16px' } }}>質疑応答内容</FormLabel>
              <Controller
                control={control}
                name="responseDetail"
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    size="small"
                    placeholder="質疑応答内容"
                    fullWidth
                    multiline
                    rows={4}
                    sx={{
                      '& .MuiInputBase-input': {
                        fontSize: { xs: '13px', sm: '16px' },
                      },
                    }}
                  />
                )}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ padding: { xs: '20px 5px!important', sm: '20px 0 40px 20px' } }}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <FormLabel sx={{ fontSize: { xs: '13px', sm: '16px' } }}>備考</FormLabel>
              <Controller
                control={control}
                name="otherRemarks"
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    size="small"
                    placeholder="備考"
                    fullWidth
                    multiline
                    rows={4}
                    sx={{
                      '& .MuiInputBase-input': {
                        fontSize: { xs: '13px', sm: '16px' },
                      },
                    }}
                  />
                )}
              />
            </FormControl>
          </Grid>
        </Grid>
        <hr />
        <Box display="flex" justifyContent="center" mt={3}>
          {getAuthority() === Authority.user && (
            <Button
              onClick={handleGoToJobResNew}
              variant="contained"
              disabled={!formState.isValid}
              color="primary"
              style={{ marginRight: '1rem' }}
            >
              作成
            </Button>
          )}
        </Box>
      </Container>
    </>
  );
};
