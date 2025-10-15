package com.api.domain.models.data;

import java.sql.Date;

import com.api.jobpal.common.base.Util;

public class JobresDetailData {
  private final String companyLocation;
  private final String representative;
  private final String foundationDate;
  private final int capital;
  private final int sales;
  private final int employeeCount;
  private final String businessDetail;
  private final String point;
  private final String responseDetail;
  private final String otherRemarks;
  private final String createDate;

  public JobresDetailData(final String companyLocation,
      final String representative,
      final Date foundationDate,
      final int capital,
      final int sales,
      final int employeeCount,
      final String businessDetail,
      final String point,
      final String responseDetail,
      final String otherRemarks,
      final Date createDate) {
    this.companyLocation = companyLocation;
    this.representative = representative;
    this.foundationDate = Util.formatDate(foundationDate, "YYYY/MM/dd");
    this.capital = capital;
    this.sales = sales;
    this.employeeCount = employeeCount;
    this.businessDetail = businessDetail;
    this.point = point;
    this.responseDetail = responseDetail;
    this.otherRemarks = otherRemarks;
    this.createDate = Util.formatDate(createDate, "MM/dd");


  }

  public String getCompanyLocation() {
    return companyLocation;
  }

  public String getRepresentative() {
    return representative;
  }

  public String getFoundationDate() {
    return foundationDate;
  }

  public int getCapital() {
    return capital;
  }

  public int getSales() {
    return sales;
  }

  public int getEmployeeCount() {
    return employeeCount;
  }

  public String getBusinessDetail() {
    return businessDetail;
  }

  public String getPoint() {
    return point;
  }

  public String getResponseDetail() {
    return responseDetail;
  }

  public String getOtherRemarks() {
    return otherRemarks;
  }

  public String getCreateDate() {
    return createDate;
  }

  @Override
  public String toString() {
    return "JobresDetailData [companyLocation=" + companyLocation + ", representative=" + representative
        + ", foundationDate=" + foundationDate + ", capital=" + capital + ", sales=" + sales + ", employeeCount="
        + employeeCount + ", businessDetail=" + businessDetail + ", point=" + point + ", responseDetail="
        + responseDetail + ", otherRemarks=" + otherRemarks + ", createDate=" + createDate + "]";
  }

}
