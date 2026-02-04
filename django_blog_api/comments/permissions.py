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


class IsOwnerOrAdmin(permissions.BasePermission):
    """
    Permission to allow comment owners or admin users to modify/delete comments.
    """
    
    def has_object_permission(self, request, view, obj):
        # Admin users can do anything
        if request.user.is_staff:
            return True
        # Owner can modify their own comment
        return obj.author == request.user
