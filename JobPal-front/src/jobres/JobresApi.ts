import { Dispatch, SetStateAction, useCallback } from 'react';
import { FC, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';



import { useMessage } from '../_wheel/common/MessageProvider';
import { useAxios } from '../_wheel/security/ApiClient';
import type { HomeParamsType } from '../home/HomeParamsType';
import type { JobresDetailPageParamsType, JobresType, NewJobresPageParamsType } from './JobresTypes';


// import type { ChangeStateParamsType, NewPageParamsType } from './JobresTypes';

// APIのエンドポイントURL
const URL_NEW = import.meta.env.VITE_REACT_APP_URL_JOBRES_NEW;
const URL_JOBRES = import.meta.env.VITE_REACT_APP_URL_JOBRES;
const URL_DETAIL = import.meta.env.VITE_REACT_APP_URL_CERTIFICATE_DETAIL;

// 証明書関連のAPIを管理するカスタムフック
export const JobresApi = () => {
  const { apiClient } = useAxios();
  const { outMessage } = useMessage();
  const getJobres = useCallback(
    async (
      params: HomeParamsType,
      setJobres: Dispatch<SetStateAction<Array<JobresType>>>,
      setAlertCount: Dispatch<SetStateAction<number>>,
      setUserName: Dispatch<SetStateAction<string>>
    ) => {
      let certificateDataList: Array<JobresType> = [];
      let alertCnt: number = 0;
      let userName: string = '';
      await apiClient(true)
        .post(URL_JOBRES, params)
        .then((res) => {
          certificateDataList = res.data.body.dashBoardList;
          alertCnt = res.data.body.alertCnt;
          userName = res.data.body.userName;
        });
      if (certificateDataList.length !== 0) {
        setJobres(certificateDataList);
      }
      setAlertCount(alertCnt);
      setUserName(userName);
    },
    []
  );

  // 新規証明書申請のAPI
  const newJobres = useCallback(async (params: NewJobresPageParamsType) => {
    console.log(params);
    await apiClient(true)
      .put(URL_NEW, params)
      .then((res) => {
        if (res.data.responseCode === '200') {
          outMessage('申請しました', false);
        } else {
          outMessage(res.data.message, true);
        }
      });
  }, []);

  // 証明書変更のAPI
  const editJobres = useCallback(async (params: NewJobresPageParamsType) => {
    await apiClient(true)
      .post(URL_NEW, params)
      .then((res) => {
        if (res.data.responseCode === '200') {
          outMessage('申請しました', false);
        } else {
          outMessage(res.data.message, true);
        }
      });
  }, []);

  // 証明書詳細情報を取得するAPI
  const getJobresDetail = useCallback(
    async (id: string, jobres: JobresType, setJobresDetail: Dispatch<SetStateAction<JobresDetailPageParamsType>>) => {
      try {
        await apiClient(true)
          .get(URL_DETAIL + '/' + id)
          .then((res) => {
            const detail = res.data.body;
            console.log(detail);
            // もともとの jobresDetail にマージする
            setJobresDetail((prev) => ({
              jobres,
              ...detail,
            }));
          });
      } catch (error) {
        console.error('詳細取得失敗', error);
      }
    },
    []
  );

  // 証明書詳細情報を取得するAPI
  const updateJobresHidden = useCallback(
    async (id: string) => {
        await apiClient(true)
          .get(URL_NEW + '/' + id)
          .then((res) => {
            if (res.data.responseCode === '200') {
              outMessage('申請しました', false);
            } else {
              outMessage(res.data.message, true);
            }
          });
    },
    []
  );

  return {
    getJobres,
    newJobres,
    getJobresDetail,
    editJobres,
    updateJobresHidden,
  };
};
