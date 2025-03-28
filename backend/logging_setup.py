import logging
from rich.logging import RichHandler

def setup_logger(app):
    # デフォルトハンドラを削除
    if app.logger.hasHandlers():
        app.logger.removeHandler(app.logger.handlers[0])

    # RichHandler設定
    handler = RichHandler(markup=True, rich_tracebacks=True)
    formatter = logging.Formatter(
        "%(asctime)s [%(levelname)s] %(name)s - %(message)s",
        datefmt="[%X]"
    )
    handler.setFormatter(formatter)

    app.logger.setLevel(logging.DEBUG)
    app.logger.addHandler(handler)
