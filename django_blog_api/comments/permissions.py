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


class IsOwner(permissions.BasePermission):
    """
    Permission to allow only the comment owner to edit.
    """
    
    def has_object_permission(self, request, view, obj):
        # Only the owner can edit
        return obj.author == request.user


class IsOwnerOrAdmin(permissions.BasePermission):
    """
    Permission to allow comment owners or admin users to delete comments.
    """
    
    def has_object_permission(self, request, view, obj):
        # Admin users can delete
        if request.user.is_staff:
            return True
        # Owner can delete their own comment
        return obj.author == request.user
