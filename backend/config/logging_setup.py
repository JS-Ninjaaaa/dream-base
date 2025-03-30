import logging

from flask import Flask, has_request_context, request
from rich.logging import RichHandler


# ログの出力にメソッドとパスを追記する
class RequestPathFilter(logging.Filter):
    def filter(self, record: logging.LogRecord) -> bool:
        if has_request_context():
            record.request_path = f"{request.method} {request.path}"
        else:
            record.request_path = "-"

        return True


# ロガーのセットアップ
def setup_logger(app: Flask):
    # 既存ロガーの削除
    for h in app.logger.handlers:
        app.logger.removeHandler(h)

    # 本番用ロガー
    handler = RichHandler(
        markup=True,
        rich_tracebacks=True,
        show_path=app.debug,
    )

    formatter = logging.Formatter("%(request_path)s - %(message)s")
    handler.setFormatter(formatter)

    handler.addFilter(RequestPathFilter())
    # INFOレベル以上のみ
    app.logger.setLevel(logging.INFO)
    app.logger.addHandler(handler)

    # 本番環境では標準ログを無効化
    if not app.debug:
        logging.getLogger("werkzeug").disabled = True
