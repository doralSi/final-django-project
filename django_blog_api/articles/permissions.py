"""
Custom permissions for articles
"""
from rest_framework import permissions


class IsStaffOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow staff/admin users to create, update, or delete.
    Read permissions are allowed to anyone (safe methods: GET, HEAD, OPTIONS).
    """
    
    def has_permission(self, request, view):
        # Allow safe methods (GET, HEAD, OPTIONS) for anyone
        if request.method in permissions.SAFE_METHODS:
            return True
        
        # For write operations (POST, PUT, PATCH, DELETE),
        # require authenticated user AND staff status
        return request.user and request.user.is_authenticated and request.user.is_staff
