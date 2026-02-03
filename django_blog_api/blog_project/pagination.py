"""
Custom pagination classes for the blog API
"""
from rest_framework.pagination import PageNumberPagination


class CustomPageNumberPagination(PageNumberPagination):
    """
    Custom pagination class that allows:
    - Default page size: 10
    - Client can override with ?page_size= parameter
    - Maximum page size: 50
    """
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 50
