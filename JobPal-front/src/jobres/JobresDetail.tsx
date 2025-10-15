import { Box, Button, Container, Grid, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { FC, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useLoginUser } from '../_wheel/security/LoginUserProvider';
import { Authority } from '../common/types/AuthorityTypes';
import { JobresApi } from './JobresApi';
import { JobresDetailPageParamsType, JobresType, testJobresDetail } from './JobresTypes';

export const JobresDetail: FC = () => {
  const { getJobresDetail, updateJobresHidden } = JobresApi();

  // 必要なフックやカスタムフック
  const { getAuthority, getUserId } = useLoginUser();
  const navigate = useNavigate();
  const location = useLocation();
  const isFirstRender = useRef(true);
  const state = location.state;

  // ステート管理
  // まず jobres をセットしておく
  const [jobresDetail, setJobresDetail] = useState<JobresDetailPageParamsType>({
    jobres: {
      jobresId: '',
      userId: '',
      companyName: '',
      industry: '',
      jobresPriority: 0,
      updateDate: '',
      hiddenFlg: false,
    },
    companyLocation: '',
    representative: '',
    foundationDate: 0,
    capital: 0,
    sales: 0,
    employeeCount: 0,
    businessDetail: '',
    point: '',
    responseDetail: '',
    otherRemarks: '',
    createDate: '',
  });

  const [buttonId, setButtonId] = useState(8);

  // // 状態変更用のパラメータ
  // const getValue: ChangeStateParamsType = {
  //   certificateIssueId: certificatedetail?.certificateIssueId ?? '',
  //   certificateStateName: certificatedetail?.certificateStateName ?? '',
  //   mediaName: certificatedetail?.mediaName ?? '',
  //   buttonId: buttonId,
  //   userId: getUserId() ?? '',
  // };

  // 初回レンダリング時に詳細データを取得
  useEffect(() => {
    if (state?.jobres) {
      getJobresDetail(state.jobres.jobresId, state.jobres, setJobresDetail);
    }
  }, [state?.jobres?.jobresId]);

  // 状態変更が必要なときの処理
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    // handleGoToStateChange();
  }, [buttonId]);

  // 企業研究ページへの遷移
  const handleGoToJobresPage = () => {
    navigate(`/jobres/new`, { state: { jobresDetail: jobresDetail } });
  };

  // 証明書削除処理
  const handleGoToJobpalHidden = async () => {
    if (window.confirm('非表示にしますか？')) {
      await updateJobresHidden(location.state.id);
      navigate(`/jobres`);
    }
  };

  // ボタン操作で状態を変更
  // const handleGoToButtonIdChange = (id: number): void => {
  //   const messages = [
  //     '承認しますか？',
  //     '取り下げますか？',
  //     '差し戻しますか？',
  //     '受領しますか？',
  //     '発行しますか？',
  //     '送信しますか？',
  //     '郵送しますか？',
  //     '完了しますか？',
  //   ];
  //   if (window.confirm(messages[id])) {
  //     setButtonId(id);
  //   }
  // };

  // 状態変更の実行
  // const handleGoToStateChange = async () => {
  //   await changeState(getValue);
  //   getCertificateDetail(location.state.id, setCertificatedetail);
  //   navigate(`/certificatedetail/${location.state.id}`, { state: { id: location.state.id } });
  // };

  // ジョブの詳細情報が存在する場合に表示するコンテンツ
  return jobresDetail ? (
    <Container>
      <Typography gutterBottom sx={{ padding: { xs: '8px 0', sm: '16px 0' }, fontSize: { xs: '18px', sm: '20px' } }}>
        企業研究詳細：{jobresDetail.jobres.companyName}
      </Typography>
      <Grid container spacing={2} sx={{ padding: { xs: '20px 5px!important', sm: '20px 0 40px 20px' } }}>
        <Grid item xs={4}>
          <Typography sx={{ fontSize: { xs: '12px', sm: '13px' } }}>企業研究番号</Typography>
          <Typography sx={{ fontSize: { xs: '13px', sm: '15px' } }}>{jobresDetail.jobres.jobresId}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography sx={{ fontSize: { xs: '12px', sm: '13px' } }}>企業優先度</Typography>
          <Typography sx={{ fontSize: { xs: '13px', sm: '15px' } }}>
            {Number(jobresDetail.jobres.jobresPriority) >= 5
              ? '☆' + '★'.repeat(Number(jobresDetail.jobres.jobresPriority) - 5)
              : '★'.repeat(Number(jobresDetail.jobres.jobresPriority))}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography sx={{ fontSize: { xs: '12px', sm: '13px' } }}>業種</Typography>
          <Typography sx={{ fontSize: { xs: '13px', sm: '15px' } }}>{jobresDetail.jobres.industry}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography sx={{ fontSize: { xs: '12px', sm: '13px' } }}>作成日</Typography>
          <Typography sx={{ fontSize: { xs: '13px', sm: '15px' } }}>{jobresDetail.createDate}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography sx={{ fontSize: { xs: '12px', sm: '13px' } }}>更新日</Typography>
          <Typography sx={{ fontSize: { xs: '13px', sm: '15px' } }}>{jobresDetail.jobres.updateDate}</Typography>
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
      <hr />
      <Grid container spacing={1} sx={{ padding: { xs: '20px 5px!important', sm: '20px 0 40px 20px' } }}>
        <Grid item xs={4}>
          <Typography sx={{ fontSize: { xs: '12px', sm: '13px' } }}>所在地</Typography>
          <Typography sx={{ fontSize: { xs: '13px', sm: '15px' } }}>{jobresDetail.companyLocation}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography sx={{ fontSize: { xs: '12px', sm: '13px' } }}>代表者</Typography>
          <Typography sx={{ fontSize: { xs: '13px', sm: '15px' } }}>{jobresDetail.representative}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography sx={{ fontSize: { xs: '12px', sm: '13px' } }}>設立</Typography>
          <Typography sx={{ fontSize: { xs: '13px', sm: '15px' } }}>
            {' '}
            {jobresDetail.foundationDate ? dayjs(jobresDetail.foundationDate).format('YYYY-MM-DD') : ''}
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={1} sx={{ padding: { xs: '20px 5px!important', sm: '20px 0 40px 20px' } }}>
        <Grid item xs={4}>
          <Typography sx={{ fontSize: { xs: '12px', sm: '13px' } }}>資本金</Typography>
          <Typography sx={{ fontSize: { xs: '13px', sm: '15px' } }}>
            {jobresDetail.capital.toLocaleString()}円
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography sx={{ fontSize: { xs: '12px', sm: '13px' } }}>売上高</Typography>
          <Typography sx={{ fontSize: { xs: '13px', sm: '15px' } }}>{jobresDetail.sales.toLocaleString()}円</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography sx={{ fontSize: { xs: '12px', sm: '13px' } }}>従業員数</Typography>
          <Typography sx={{ fontSize: { xs: '13px', sm: '15px' } }}>{jobresDetail.employeeCount}人</Typography>
        </Grid>
      </Grid>
      <hr />
      <Grid container spacing={1} sx={{ padding: { xs: '20px 5px!important', sm: '20px 0 40px 20px' } }}>
        <Grid item xs={8} sm={5}>
          <Typography sx={{ fontSize: { xs: '12px', sm: '13px' } }}>事業内容</Typography>
          <Typography sx={{ fontSize: { xs: '13px', sm: '15px' } }}>{jobresDetail.businessDetail}</Typography>
        </Grid>
      </Grid>
      <hr />
      <Grid container spacing={1} sx={{ padding: { xs: '20px 5px!important', sm: '20px 0 40px 20px' } }}>
        <Grid item xs={8} sm={5}>
          <Typography sx={{ fontSize: { xs: '12px', sm: '13px' } }}>気になった点</Typography>
          <Typography sx={{ fontSize: { xs: '13px', sm: '15px' } }}>{jobresDetail.point}</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={1} sx={{ padding: { xs: '20px 5px!important', sm: '20px 0 40px 20px' } }}>
        <Grid item xs={8} sm={5}>
          <Typography sx={{ fontSize: { xs: '12px', sm: '13px' } }}>質疑応答内容</Typography>
          <Typography sx={{ fontSize: { xs: '13px', sm: '15px' } }}>{jobresDetail.responseDetail}</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={1} sx={{ padding: { xs: '20px 5px!important', sm: '20px 0 40px 20px' } }}>
        <Grid item xs={8} sm={5}>
          <Typography sx={{ fontSize: { xs: '12px', sm: '13px' } }}>その他備考</Typography>
          <Typography sx={{ fontSize: { xs: '13px', sm: '15px' } }}>{jobresDetail.otherRemarks}</Typography>
        </Grid>
      </Grid>
      <Box display="flex" justifyContent="center" mt={3}>
        <>
          <Button
            onClick={() => handleGoToJobresPage()}
            variant="contained"
            color="primary"
            style={{ marginRight: '1rem' }}
          >
            変更
          </Button>
          <Button
            onClick={() => handleGoToJobpalHidden() }
            variant="contained"
            color="primary"
            style={{ marginRight: '1rem' }}
          >
            非表示
          </Button>
        </>
      </Box>
    </Container>
  ) : null;
};
