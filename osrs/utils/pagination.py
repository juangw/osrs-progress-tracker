from dataclasses import dataclass
from typing import Mapping, Any
from sqlalchemy.orm import Query


@dataclass
class Pagination:
    query: Query
    page: int
    page_size: int
    total: int
    items: Mapping[str, Any]


class PaginationException(Exception):
    pass


def paginate(query, page, page_size=20, error_out=True):
    if error_out and page < 1:
        raise PaginationException(404)
    items = query.limit(page_size).offset((page - 1) * page_size).all()
    if not items and page != 1 and error_out:
        raise PaginationException(404)

    # No need to count if we're on the first page and there are fewer
    # items than we expected.
    if page == 1 and len(items) < page_size:
        total = len(items)
    else:
        total = query.order_by(None).count()

    return Pagination(query, page, page_size, total, items)
