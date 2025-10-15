package com.api.domain.models.entities;

import java.util.ArrayList;
import java.util.List;

import com.api.domain.models.data.JobresData;

/**
 * 証明書発行のダッシュボード表示に必要な入力値を保持するエンティティクラスです。
 *
 * <p>
 * 各項目のデータ仕様は基本設計書を参照してください。
 */
public class JobresDashBoardEntity {

	/**
	 * ユーザ名
	 */
	private final String userName;

	/**
	 * 通知の件数
	 */
	private final int alertCnt;

	/**
	 * ダッシュボードリスト
	 */
	private final List<JobresData> jobresList;

	public JobresDashBoardEntity(String userName) {
		this(userName, 0, new ArrayList<JobresData>());
	}

	public JobresDashBoardEntity(String userName, int alertCnt, List<JobresData> jobresList) {
		this.userName = userName;
		this.alertCnt = alertCnt;
		this.jobresList = jobresList;
	}

	// gettter
	public String getUserName() {
		return userName;
	}

	public int getAlertCnt() {
		return alertCnt;
	}

	public List<JobresData> getDashBoardList() {
		return jobresList;
	}

	@Override
	public String toString() {
		return "CertificateDashBoardEntity [userName=" + userName + ", alertCnt=" + alertCnt + ", dashBoardList="
				+ jobresList + "]";
	}

}
