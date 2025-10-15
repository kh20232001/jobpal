package com.api.domain.repositories;

import java.sql.Date;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import com.api.domain.models.data.JobresData;
import com.api.domain.models.data.JobresDetailData;
import com.api.domain.models.dbdata.CertificateIssuanceEntity;
import com.api.domain.models.forms.JobresForm;
import com.api.domain.models.forms.JobresUpdateForm;
import com.api.jobpal.common.base.DBDataConversion;

/**
 * 証明書発行ダッシュボードに関わるDBアクセスを実現するクラスです。
 *
 * <p>
 * 以下の処理を行います。
 * <ul>
 * </ul>
 * <p>
 * 処理が継続できない場合は、呼び出し元へ例外をスローします。<br>
 * <strong>呼び出し元では適切な例外処理を行ってください。</strong>
 */
@Repository
public class JobresRepository {

	/**
	 * SQL 企業研究ダッシュボードデータ取得
	 */
	private static String SQL_SELECT_JOBRES = "SELECT jobres_id, "
			+ "company_name, "
			+ "industry, "
			+ "jobres_priority, "
			+ "update_date, "
			+ "hidden_flg "
			+ "FROM "
			+ "JOBRES_T "
			+ "WHERE "
			+ "user_id = :userId";

	/**
	 * SQL 証明書発行ダッシュボード全件取得 (担任用)
	 */
	private static String SQL_SELECT_JOBRES_DETAIL = "SELECT "
			+ "company_location, "
			+ "representative, "
			+ "foundation_date, "
			+ "capital, "
			+ "sales, "
			+ "employee_count, "
			+ "business_detail, "
			+ "point, "
			+ "response_detail, "
			+ "other_remarks, "
			+ "create_date "
			+ "FROM "
			+ "JOBRES_T "
			+ "WHERE "
			+ "jobres_id = :jobresId";

	private static String SQL_SELECT_JOBRES_MAX_ID = "SELECT MAX(jobres_id) FROM JOBRES_T";
	/**
	 * SQL 証明書発行ダッシュボード全件取得（学生用）
	 */
	private static String SQL_INSERT_JOBRES = "INSERT INTO" +
			"	JOBRES_T (" +
			"    jobres_id," +
			"    user_id," +
			"    company_name," +
			"    industry," +
			"    jobres_priority," +
			"    update_date," +
			"    company_location," +
			"    representative," +
			"    foundation_date," +
			"    capital," +
			"    sales," +
			"    employee_count," +
			"    business_detail," +
			"    point," +
			"    response_detail," +
			"    other_remarks," +
			"    create_date" +
			") VALUES (" +
			"    :jobresId ," +
			"    :userId ," +
			"    :companyName ," +
			"    :industry ," +
			"    :jobresPriority ," +
			"    :updateDate ," +
			"    :companyLocation ," +
			"    :representative ," +
			"    :foundationDate ," +
			"    :capital ," +
			"    :sales ," +
			"    :employeeCount ," +
			"    :businessDetail ," +
			"    :point ," +
			"    :responseDetail ," +
			"    :otherRemarks ," +
			"    :createDate " +
			")";

	/**
	 * SQL 証明書発行ダッシュボード全件取得（事務用）
	 */
	private static String SQL_UPDATE_JOBRES = "UPDATE JOBRES_T SET " +
			"    company_name = :companyName , " +
			"    industry = :industry , " +
			"    jobres_priority = :jobresPriority , " +
			"    update_date = :updateDate , " +
			"    company_location = :companyLocation , " +
			"    representative = :representative , " +
			"    foundation_date = :foundationDate , " +
			"    capital = :capital , " +
			"    sales = :sales , " +
			"    employee_count = :employeeCount , " +
			"    business_detail = :businessDetail , " +
			"    point = :point , " +
			"    response_detail = :responseDetail , " +
			"    other_remarks = :otherRemarks " +
			"WHERE jobres_id = :jobresId ";

	private static String SQL_UPDATE_HIDDEN_FLG = "UPDATE JOBRES_T SET " +
			"    hidden_flg = NOT hidden_flg " +
			"WHERE jobres_id = :jobresId ";

	private static final int EXPECTED_UPDATE_COUNT = 1;

	/**
	 * NamedParameterJdbcTemplateを使用してSQLを実行するためのオブジェクト。
	 */
	@Autowired
	private NamedParameterJdbcTemplate jdbc;

	/**
	 * データベースから取得したデータを変換するためのユーティリティクラス。
	 */
	@Autowired
	private DBDataConversion dbdc;

	/**
	 * ダッシュボードのデータを全件取得します。(管理者用)
	 *
	 * <p>
	 * 管理者向けに、証明書発行のダッシュボードデータを全件取得します。<br>
	 * 各証明書発行データに郵送料や重量を加算して、一覧として返却します。
	 * </p>
	 *
	 * @return ダッシュボードデータのリスト
	 */
	public List<JobresData> selectJobres(final String userId) {
		// ダッシュボードデータリストの初期化
		List<JobresData> jobresDataList = new ArrayList<>();

		// クエリパラメータを設定（今回は空のマップ）
		Map<String, Object> params = new HashMap<>();
		params.put("userId", userId);
		// データベースからダッシュボードデータを取得
		List<Map<String, Object>> resultJobresList = jdbc
				.queryForList(SQL_SELECT_JOBRES, params);
		// 結果が存在しない場合はnullを返却
		if (resultJobresList.isEmpty()) {
			return null;
		}

		// ダッシュボードデータを整形
		for (Map<String, Object> resultData : resultJobresList) {
			String jobresId = (String) resultData.get("jobres_id");
			String companyName = (String) resultData.get("company_name");
			String industry = (String) resultData.get("industry");
			int jobresPriority = Integer.parseInt(resultData.get("jobres_priority").toString());
			Date updateDate = (Date) resultData.get("update_date");
			boolean hiddenFlg = (boolean) resultData.get("hidden_flg");
			JobresData newJobresData = new JobresData(jobresId, userId, companyName, industry, jobresPriority, updateDate,
					hiddenFlg);
			System.out.println(newJobresData);
			// ダッシュボードデータリストに追加
			jobresDataList.add(newJobresData);
		}

		// 完成したダッシュボードデータリストを返却
		return jobresDataList;

	}

	/**
	 * /**
	 * 証明書発行ダッシュボードの詳細データを取得します。
	 *
	 * @param certificateIssuanceId 証明書発行ID (null不可)
	 * @return 証明書発行ダッシュボードの詳細データ。取得失敗時はnullを返却。
	 */
	public JobresDetailData selectJobresDetail(
			final String jobresId) {

		// クエリのパラメータを設定
		Map<String, Object> params = new HashMap<>();
		params.put("jobresId", jobresId);

		// SQL_SELECT_CERTIFICATE_ISSUANCE_DASHBOARD_DETAILクエリを実行し、結果を取得
		List<Map<String, Object>> resultList = jdbc.queryForList(SQL_SELECT_JOBRES_DETAIL, params);

		// 結果が存在しない場合はnullを返却
		if (resultList.isEmpty()) {
			return null;
		}
		// 結果の最初のデータを取得
		Map<String, Object> resultData = resultList.get(0);
		String companyLocation = (String) resultData.get("company_location");
		String representative = (String) resultData.get("representative");
		Date foundationDate = (Date) resultData.get("foundation_date");
		System.out.println(foundationDate);
		int capital = Integer.parseInt(resultData.get("capital").toString());
		int sales = Integer.parseInt(resultData.get("sales").toString());
		int employeeCount = Integer.parseInt(resultData.get("employee_count").toString());
		String businessDetail = (String) resultData.get("business_detail");
		String point = (String) resultData.get("point");
		String responseDetail = (String) resultData.get("response_detail");
		String otherRemarks = (String) resultData.get("other_remarks");
		Date createDate = (Date) resultData.get("create_date");

		JobresDetailData jobresDetailData = new JobresDetailData(companyLocation, representative, foundationDate, capital,
				sales, employeeCount, businessDetail, point, responseDetail, otherRemarks, createDate);
		// 詳細データを構築して返却
		return jobresDetailData;
	}

	public String getJobresId() {
		// SQL_SELECT_CERTIFICATE_ISSUANCE_ID_MAXクエリを実行し、結果を取得
		return dbdc.getLargerId(SQL_SELECT_JOBRES_MAX_ID, "JB");
	}

	public boolean insertJobres(JobresForm jobresForm, String userId) {
		// 現在の日付を取得
		Date today = dbdc.getNowDate();
		System.out.println(jobresForm.getFoundationDate());
		// SQLクエリのパラメータを設定
		Map<String, Object> params = dbdc.mapInputValues(
				SQL_INSERT_JOBRES,
				getJobresId(),
				userId,
				jobresForm.getCompanyName(),
				jobresForm.getIndustry(),
				jobresForm.getJobresPriority(),
				today,
				jobresForm.getCompanyLocation(),
				jobresForm.getRepresentative(),
				Date.valueOf(jobresForm.getFoundationDate()),
				jobresForm.getCapital(),
				jobresForm.getSales(),
				jobresForm.getEmployeeCount(),
				jobresForm.getBusinessDetail(),
				jobresForm.getPoint(),
				jobresForm.getResponseDetail(),
				jobresForm.getOtherRemarks(),
				today);
		System.out.println(params);
		// SQLクエリを実行して更新件数を取得
		int updateRow = jdbc.update(SQL_INSERT_JOBRES, params);

		// 更新結果を返却
		return updateRow == EXPECTED_UPDATE_COUNT;

	}

	public boolean updateJobres(JobresUpdateForm jobresUpdateForm) {
		// 現在の日付を取得
		Date today = dbdc.getNowDate();

		// SQLクエリのパラメータを設定
		Map<String, Object> params = dbdc.mapInputValues(
				SQL_UPDATE_JOBRES,
				jobresUpdateForm.getCompanyName(),
				jobresUpdateForm.getIndustry(),
				jobresUpdateForm.getJobresPriority(),
				today,
				jobresUpdateForm.getCompanyLocation(),
				jobresUpdateForm.getRepresentative(),
				Date.valueOf(jobresUpdateForm.getFoundationDate().replace("/", "-")),
				jobresUpdateForm.getCapital(),
				jobresUpdateForm.getSales(),
				jobresUpdateForm.getEmployeeCount(),
				jobresUpdateForm.getBusinessDetail(),
				jobresUpdateForm.getPoint(),
				jobresUpdateForm.getResponseDetail(),
				jobresUpdateForm.getOtherRemarks(),
				jobresUpdateForm.getJobresId());
		// SQLクエリを実行して更新件数を取得
		int updateRow = jdbc.update(SQL_UPDATE_JOBRES, params);

		// 更新結果を返却
		return updateRow == EXPECTED_UPDATE_COUNT;

	}


	public boolean updateHiddenFlg(String jobresId) {
		// SQLクエリのパラメータを設定
		Map<String, Object> params = new HashMap<>();
		params.put("jobresId", jobresId);		// SQLクエリを実行して更新件数を取得
		int updateRow = jdbc.update(SQL_UPDATE_HIDDEN_FLG, params);

		// 更新結果を返却
		return updateRow == EXPECTED_UPDATE_COUNT;

	}
}
