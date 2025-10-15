package com.api.jobpal.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.domain.models.data.JobresDetailData;
import com.api.domain.models.displaydata.CertificateDisplayDetail;
import com.api.domain.models.entities.CertificateDashBoardEntity;
import com.api.domain.models.entities.CertificateFeeAndWeightEntity;
import com.api.domain.models.entities.JobresDashBoardEntity;
import com.api.domain.models.forms.CertificateDashBoardForm;
import com.api.domain.models.forms.CertificateInsertForm;
import com.api.domain.models.forms.CertificateStateUpdateForm;
import com.api.domain.models.forms.JobresForm;
import com.api.domain.models.forms.JobresUpdateForm;
import com.api.domain.repositories.UserRepository;
import com.api.domain.services.CertificateDashBoardService;
import com.api.domain.services.JobresService;
import com.api.jobpal.common.base.BaseResponse;
import com.api.jobpal.common.base.ResponseMessage;
import com.api.jobpal.common.base.Util;

/**
 * 証明書ダッシュボードに関連するコントローラークラスです。
 *
 * <p>
 * 以下の操作を提供します:
 * <ul>
 * <li>証明書ダッシュボードデータの取得（全体・ユーザー別）</li>
 * <li>証明書料金・重量データの取得</li>
 * <li>新規証明書発行の作成</li>
 * <li>既存証明書発行データの更新</li>
 * </ul>
 * </p>
 *
 * <p>
 * <strong>注意点:</strong>
 * 入力データのバリデーション結果は必ずチェックする必要があります。<br>
 * バリデーションエラー時には 400 Bad Request を返却し、サーバーエラー時には 500 Internal Server Error
 * を返却します。
 * </p>
 *
 * <p>
 * エラーレスポンスを適切に処理してください。<br>
 * バリデーションエラー時にはクライアント側で修正対応を行う必要があります。
 * </p>
 */
@RestController
@RequestMapping("jobres")
public class JobresController {

	/**
	 * ロガーオブジェクト。
	 */
	private static final Logger logger = LoggerFactory.getLogger(CertificateDashBoardController.class);

	/**
	 * 証明書ダッシュボードのサービス層。
	 */
	@Autowired
	private JobresService jobresService;

	@PostMapping
	public BaseResponse getJobresAll(Authentication authentication) {
		String userId = authentication.getName();
		try {
			// 管理者権限の場合
			JobresDashBoardEntity dashBoardEntity = jobresService.getJobresAll(userId);

			// 成功レスポンスを返却
			return BaseResponse.success(dashBoardEntity, ResponseMessage.SUCCESS);

		} catch (Exception ex) {
			// エラー処理: デフォルトエンティティを作成して返却
			logger.error("ダッシュボードデータ取得エラー: ", ex);
			return BaseResponse.internalServerError(ResponseMessage.INTERNAL_SERVER_ERROR_MESSAGE);
		}
	}

	@GetMapping("/{id}")
	public BaseResponse getUserDetail(@PathVariable(value = "id") String jobresId) {
		// サービス層から詳細情報を取得
		try {
			JobresDetailData jobresDetailData = jobresService.getJobresDetail(jobresId);
			// 取得した詳細情報を成功レスポンスとして返却
			return BaseResponse.success(jobresDetailData, ResponseMessage.SUCCESS);
		} catch (Exception e) {
			logger.error("ダッシュボード	詳細取得エラー: ", e);
			return BaseResponse.internalServerError(ResponseMessage.INTERNAL_SERVER_ERROR_MESSAGE);
		}
	}
	@GetMapping("/new/{id}")
	public BaseResponse updateHiddenflg(@PathVariable(value = "id") String jobresId) {
		// サービス層から詳細情報を取得
		try {
			boolean result = jobresService.updatehiddenFlg(jobresId);
			// 取得した詳細情報を成功レスポンスとして返却
			return BaseResponse.success(result, ResponseMessage.SUCCESS);
		} catch (Exception e) {
			logger.error("ダッシュボード	詳細取得エラー: ", e);
			return BaseResponse.internalServerError(ResponseMessage.INTERNAL_SERVER_ERROR_MESSAGE);
		}
	}

	@PutMapping("/new")
	public BaseResponse newJobres(@RequestBody @Validated JobresForm jobresForm,
			BindingResult bindingResult, Authentication authentication) {
		System.out.println(jobresForm);
		if (bindingResult.hasErrors()) {
			logger.warn("入力エラー: {}", bindingResult.toString());
			return BaseResponse.badRequest();
		}
		try {
			// サービス層から証明書の詳細情報を取得
			boolean result = jobresService.createJobres(jobresForm, authentication.getName());
			if (!result) {
				return BaseResponse.internalServerError();
			}
			// 成功レスポンスを返却
			return BaseResponse.success(result, ResponseMessage.SUCCESS);
		} catch (Exception ex) {
			// エラーログの記録
			logger.error("証明書詳細情報取得エラー: ", ex);

			// 失敗レスポンスを返却
			return BaseResponse.internalServerError();
		}
	}

	/**
	* 新規証明書発行の作成を行います。
	*
	* <p>
	* フロントエンドから送信された証明書情報を元に、新しい証明書発行データを作成します。<br>
	* 入力データが不正な場合は 400 Bad Request を返却します。<br>
	* サーバー側でエラーが発生した場合は 500 Internal Server Error を返却します。
	* </p>
	*
	* @param certificateInsertForm 新規証明書情報
	* @param bindingResult 入力データのバリデーション結果
	* @return 成功時：証明書の作成結果、失敗時：エラーレスポンス
	*/
	@PostMapping("/new")
	public BaseResponse updateJobres(@RequestBody @Validated JobresUpdateForm jobresForm,	BindingResult bindingResult) {

	// 入力データのバリデーションチェック
	if (bindingResult.hasErrors()) {
	logger.warn("バリデーションエラー: {}", bindingResult.toString());
	return BaseResponse.badRequest();
	}
	try {
	// 証明書作成処理
	boolean result = jobresService.updateJobres(jobresForm);
	if (result) {
	// 成功レスポンスを返却
	return BaseResponse.success(null, ResponseMessage.SUCCESS);
	} else {
	// 作成失敗時のレスポンス
	return BaseResponse.internalServerError();
	}
	} catch (Exception ex) {
	// エラー発生時のログ記録
	logger.error("証明書更新エラー: ", ex);
	return BaseResponse.internalServerError();
	}
	}

	// /**
	// * 既存の証明書発行データを更新します。
	// *
	// * <p>
	// * フロントエンドから送信された証明書情報を元に、証明書発行データを更新します。<br>
	// * 入力データが不正な場合は 400 Bad Request を返却します。<br>
	// * サーバー側でエラーが発生した場合は 500 Internal Server Error を返却します。
	// * </p>
	// *
	// * @param certificateInsertForm 証明書更新情報
	// * @param bindingResult 入力データのバリデーション結果
	// * @return 成功時：証明書の更新結果、失敗時：エラーレスポンス
	// */
	// @PutMapping("/new")
	// public BaseResponse updateCertificate(@RequestBody @Validated
	// CertificateInsertForm certificateInsertForm,
	// BindingResult bindingResult) {

	// // 入力データのバリデーションチェック
	// if (bindingResult.hasErrors()) {
	// logger.warn("バリデーションエラー: {}", bindingResult.toString());
	// return BaseResponse.badRequest();
	// }

	// try {
	// // 証明書更新処理
	// boolean isSuccess =
	// dashBoardService.updateCertificate(certificateInsertForm);
	// if (isSuccess) {
	// // 成功レスポンスを返却
	// return BaseResponse.success(null, ResponseMessage.SUCCESS);
	// } else {
	// // 更新失敗時のレスポンス
	// return BaseResponse.internalServerError();
	// }
	// } catch (Exception ex) {
	// // エラー発生時のログ記録
	// logger.error("証明書更新エラー: ", ex);
	// return BaseResponse.internalServerError();
	// }
	// }

}
