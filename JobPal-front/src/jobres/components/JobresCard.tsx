import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { FC, MouseEventHandler, memo } from 'react';

import { useLoginUser } from '../../_wheel/security/LoginUserProvider';
import { Authority } from '../../common/types/AuthorityTypes';
import { JobresType } from '../JobresTypes';

interface JobresCardProps {
  jobres: JobresType;
  handle: MouseEventHandler<HTMLButtonElement> | undefined;
}

// JobresCardコンポーネントを定義
export const JobresCard: FC<JobresCardProps> = memo((props: JobresCardProps) => {
  const { getAuthority } = useLoginUser();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const { jobres, handle } = props;

  // カードがクリックされたときのハンドラー
  const handleClick = () => {
    if (handle) {
      handle({} as React.MouseEvent<HTMLButtonElement>);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <Card
        onClick={handleClick}
        sx={{
          cursor: 'pointer',
          marginBottom: '16px',
          boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.25)',
          backgroundColor: '#fff',
          '&:hover': {
            backgroundColor: '#f0f0f0',
          },
        }}
      >
        <CardContent style={{ padding: '16px' }}>
          <Grid container spacing={2} sx={{ height: '70px' }}>
            <Grid item xs={2} sm={1} container alignItems="flex-end" sx={{ padding: '0 0 4px 2px' }}>
              <Typography variant="h6">{jobres.updateDate}</Typography>
            </Grid>
            <Grid item xs={0.25} sm={0.25} container alignItems="center"></Grid>
            <Grid item xs={7} sm={2} container alignItems="center">
              <Typography variant="h5" sx={{ fontSize: { xs: '16px', sm: '20px' } }}>
              {jobres.companyName.length >= 9
            ? jobres.companyName.substring(0,8)+"…"
            : jobres.companyName}
              </Typography>
            </Grid>
            <Grid item xs={3} sm={2} container alignItems="center">
              <Typography variant="h5" sx={{ fontSize: { xs: '16px', sm: '20px' } }}>
                {jobres.industry}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card
        sx={{
          position: 'absolute',
          top: -8,
          left: -8,
          backgroundColor: 'red',
          color: 'white',
          padding: '4px 10px',
          borderRadius: '0px',
          boxShadow: '3px 3px 3px rgba(0, 0, 0, 0.25)',
        }}
      >
        <Typography variant="body1">
          {Number(jobres.jobresPriority) >= 5
            ? '☆' + '★'.repeat(Number(jobres.jobresPriority) - 5)
            : '★'.repeat(Number(jobres.jobresPriority))}
        </Typography>
      </Card>
    </div>
  );
});
