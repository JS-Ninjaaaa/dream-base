import logging
from rich.logging import RichHandler

def setup_logger(app, is_production=False):
    # デフォルトハンドラを削除
    for h in app.logger.handlers[:]:
        app.logger.removeHandler(h)

    # ロガーをセット
    handler = RichHandler(markup=True, rich_tracebacks=True)
    app.logger.setLevel(logging.INFO)
    app.logger.addHandler(handler)
    # 本番はwerkzeugのログ（標準）を無効
    if is_production:
        logging.getLogger('werkzeug').disabled = True
