package com.api.domain.models.data;

import java.sql.Date;

import com.api.jobpal.common.base.Util;

public class JobresData {
  private final String jobresId; // 企業研究ID
  private final String userId; // ユーザーID
  private final String companyName; // 企業名
  private final String industry; // 業種
  private final int jobresPriority; // 企業優先度
  private final String updateDate; // 更新日
  private final boolean hiddenFlg; // 非表示フラグ

  public JobresData(final String jobresId, final String userId, final String companyName, final String industry,
      final int jobresPriority, final Date updateDate, final boolean hiddenFlg) {
    this.jobresId = jobresId;
    this.userId = userId;
    this.companyName = companyName;
    this.industry = industry;
    this.jobresPriority = jobresPriority;
    this.updateDate = Util.formatDate(updateDate, "MM/dd");
    this.hiddenFlg = hiddenFlg;
  }

  public String getJobresId() {
    return jobresId;
  }

  public String getUserId() {
    return userId;
  }

  public String getCompanyName() {
    return companyName;
  }

  public String getIndustry() {
    return industry;
  }

  public int getJobresPriority() {
    return jobresPriority;
  }

  public String getUpdateDate() {
    return updateDate;
  }

  public boolean isHiddenFlg() {
    return hiddenFlg;
  }

  @Override
  public String toString() {
    return "JobresData [jobresId=" + jobresId + ", userId=" + userId + ", companyName="
        + companyName + ", industry=" + industry + ", jobresPriority=" + jobresPriority + ", updateDate=" + updateDate
        + ", hiddenFlg=" + hiddenFlg + "]";
  }

}
