package com.api.domain.models.forms;

/**
 * ユーザ作成の入力値を保持するクラスです。
 *
 * <p>
 * 各項目のデータ仕様は基本設計書を参照してください。
 */
public class JobresForm {
    String companyName; // 企業名
    String industry; // 業種
    int jobresPriority; // 企業優先度
    String companyLocation; // 本社所在地
    String representative; // 代表者
    String foundationDate; // 設立
    int capital; // 資本金
    int sales; // 売上高
    int employeeCount; // 従業員数
    String businessDetail; // 事業内容
    String point; // 気になった点
    String responseDetail; // 質疑応答内容
    String otherRemarks; // その他備考

    public String getCompanyName() {
        return companyName;
    }

    public String getIndustry() {
        return industry;
    }

    public int getJobresPriority() {
        return jobresPriority;
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

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public void setIndustry(String industry) {
        this.industry = industry;
    }

    public void setJobresPriority(int jobresPriority) {
        this.jobresPriority = jobresPriority;
    }

    public void setCompanyLocation(String companyLocation) {
        this.companyLocation = companyLocation;
    }

    public void setRepresentative(String representative) {
        this.representative = representative;
    }

    public void setFoundationDate(String foundationDate) {
        this.foundationDate = foundationDate;
    }

    public void setCapital(int capital) {
        this.capital = capital;
    }

    public void setSales(int sales) {
        this.sales = sales;
    }

    public void setEmployeeCount(int employeeCount) {
        this.employeeCount = employeeCount;
    }

    public void setBusinessDetail(String businessDetail) {
        this.businessDetail = businessDetail;
    }

    public void setPoint(String point) {
        this.point = point;
    }

    public void setResponseDetail(String responseDetail) {
        this.responseDetail = responseDetail;
    }

    public void setOtherRemarks(String otherRemarks) {
        this.otherRemarks = otherRemarks;
    }

}
