// 企業研究情報の型
export type JobresType = {
  jobresId: string; // 企業研究ID
  userId: string; // ユーザーID
  companyName: string; // 企業名
  industry: string; // 業種
  jobresPriority: number; // 企業優先度
  updateDate: string; // 更新日
  hiddenFlg: boolean;
};

// 企業研究詳細情報の型
export type JobresDetailPageParamsType = {
  jobres: JobresType;
  companyLocation: string; // 本社所在地
  representative: string; // 代表者
  foundationDate: number; // 設立
  capital: number; // 資本金
  sales: number; // 売上高
  employeeCount: number; // 従業員数
  businessDetail: string; // 事業内容
  point: string; // 気になった点
  responseDetail: string; // 質疑応答内容
  otherRemarks: string; // その他備考
  createDate: string; // 作成日
};
export type NewJobresPageParamsType = {
  jobresId?: string; // 企業研究ID
  companyName: string; // 企業名
  industry: string; // 業種
  jobresPriority: number; // 企業優先度
  companyLocation: string; // 本社所在地
  representative: string; // 代表者
  foundationDate: number; // 設立
  capital: number; // 資本金
  sales: number; // 売上高
  employeeCount: number; // 従業員数
  businessDetail: string; // 事業内容
  point: string; // 気になった点
  responseDetail: string; // 質疑応答内容
  otherRemarks: string; // その他備考
};
export type UpdateJobresPageParamsType = {
  jobresId: string; // 企業研究ID
  companyName: string; // 企業名
  industry: string; // 業種
  jobresPriority: number; // 企業優先度
  companyLocation: string; // 本社所在地
  representative: string; // 代表者
  foundationDate: number; // 設立
  capital: number; // 資本金
  sales: number; // 売上高
  employeeCount: number; // 従業員数
  businessDetail: string; // 事業内容
  point: string; // 気になった点
  responseDetail: string; // 質疑応答内容
  otherRemarks: string; // その他備考
};
// 企業研究情報の型
export const testJobres: JobresType = {
  jobresId: 'CR_0000_00001', // 初期値: 空文字列
  userId: 'example@hcs.ac.jp', // 初期値: 空文字列
  // userName: '情報太郎', // 初期値: 空文字列
  jobresPriority: 6, // 初期値: 空文字列
  updateDate: '2925/6/17', // 初期値: 空文字列（例：new Date().toISOString() にすることも可）
  companyName: '株式会社HBA', // 初期値: 空文字列
  industry: 'ソフトウェア', // 初期値: 空文字列
  hiddenFlg: false,
};
export const testJobresDetail: JobresDetailPageParamsType = {
  jobres: testJobres,
  companyLocation: '北海道札幌市中央区', // 初期値: 空文字列
  representative: '山田 太郎', // 初期値: 空文字列
  foundationDate: new Date('1990-04-01').getTime(),
  capital: 100000000, // 初期値: 0
  sales: 5000000000, // 初期値: 0
  employeeCount: 300, // 初期値: 0
  businessDetail: '業務システム開発およびITコンサルティング', // 初期値: 空文字列
  point: '社内の雰囲気が良く、社員教育が充実している点', // 初期値: 空文字列
  responseDetail: 'Q：研修制度は？ A：新入社員研修に加えてOJTもあります。', // 初期値: 空文字列
  otherRemarks: 'リモート勤務制度あり', // 初期値: 空文字列
  createDate: '2025/04/17', // 初期値: 空文字列（例：new Date().toISOString() にすることも可）
};

// 状態変更のリクエスト型
export type ChangeStateParamsType = {
  certificateIssueId: string; // 証明書発行ID
  certificateStateName: string; // 変更後の状態名
  mediaName: string; // 媒体名
  buttonId: number; // 操作ボタンID（変更内容を識別）
  userId: string; // ユーザーID
};
