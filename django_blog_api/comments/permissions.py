"""
Custom permissions for comments
"""
from rest_framework import permissions


class IsStaffOnly(permissions.BasePermission):
    """
    Permission to only allow staff/admin users to perform actions.
    """
    
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.is_staff
