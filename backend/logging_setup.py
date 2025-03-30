import logging
from flask import has_request_context, request
from rich.logging import RichHandler

# ログの出力にメソッドとパスを追記する
class RequestPathFilter(logging.Filter):
    def filter(self, record):
        if has_request_context():
            record.request_path = f"{request.method} {request.path}"
        else:
            record.request_path = "-"
        return True
# ロガーのセットアップ
def setup_logger(app, is_production=False):
    for h in app.logger.handlers[:]: # 既存ロガーの削除
        app.logger.removeHandler(h)
    # 本番用ロガー
    handler = RichHandler(markup=True, rich_tracebacks=True, show_path= not is_production)

    formatter = logging.Formatter("%(request_path)s - %(message)s")
    handler.setFormatter(formatter)

    handler.addFilter(RequestPathFilter())
    # INFOレベル以上のみ
    app.logger.setLevel(logging.INFO)
    app.logger.addHandler(handler)
    # 開発用
    if is_production: # 標準ログを有効に
        logging.getLogger('werkzeug').disabled = True
