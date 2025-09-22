import os
from pathlib import Path
import json

def should_skip_file(filepath):
    """Determine if a file should be skipped"""
    skip_patterns = [
        'node_modules',
        '.env',
        'package-lock.json',
        '.gitignore',
        'robots.txt',
        '.png',
        '.jpg',
        '.jpeg',
        '.gif',
        '.ico',
        '.svg'
    ]
    
    filepath_str = str(filepath)
    return any(pattern in filepath_str for pattern in skip_patterns)

def get_file_priority(filename):
    """Get priority for file ordering (lower number = higher priority)"""
    priority_map = {
        'package.json': 1,
        'tailwind.config.js': 2,
        'postcss.config.js': 3,
        'index.html': 4,
        'manifest.json': 5,
        'App.jsx': 6,
        'index.js': 7,
        'globals.css': 8
    }
    return priority_map.get(filename, 99)

def get_relative_path(filepath, root_dir):
    """Get relative path from root directory"""
    return os.path.relpath(filepath, root_dir)

def create_markdown_header(level, text):
    """Create markdown header with appropriate level"""
    return f"{'#' * level} {text}\n\n"

def get_file_language(filename):
    """Determine the language for syntax highlighting"""
    ext_map = {
        '.js': 'javascript',
        '.jsx': 'jsx',
        '.json': 'json',
        '.css': 'css',
        '.html': 'html'
    }
    
    ext = os.path.splitext(filename)[1]
    return ext_map.get(ext, 'text')

def compile_frontend_to_markdown(root_dir, output_file='frontend_documentation.md'):
    """
    Compile all frontend files in the project to a single markdown file
    
    Args:
        root_dir: Root directory of the project
        output_file: Output markdown filename
    """
    root_path = Path(root_dir)
    
    # Dictionary to organize files by directory
    file_structure = {}
    
    # Walk through the directory tree
    for root, dirs, files in os.walk(root_path):
        # Skip node_modules directories
        dirs[:] = [d for d in dirs if d not in ['node_modules', '.git']]
        
        for file in files:
            filepath = os.path.join(root, file)
            
            # Skip files we don't want to document
            if should_skip_file(filepath):
                continue
            
            # Process relevant files
            extensions = ['.js', '.jsx', '.json', '.css', '.html']
            if any(file.endswith(ext) for ext in extensions) or file in ['tailwind.config.js', 'postcss.config.js']:
                rel_path = get_relative_path(filepath, root_dir)
                dir_path = os.path.dirname(rel_path)
                
                if dir_path not in file_structure:
                    file_structure[dir_path] = []
                
                file_structure[dir_path].append({
                    'name': file,
                    'path': filepath,
                    'rel_path': rel_path
                })
    
    # Write to markdown file
    with open(output_file, 'w', encoding='utf-8') as md_file:
        # Write main title
        md_file.write(create_markdown_header(1, "Frontend Project Documentation"))
        md_file.write("This document contains all the source code from the React frontend project.\n\n")
        md_file.write("**Project Type:** React with Tailwind CSS\n")
        md_file.write("**Generated on:** " + str(Path.cwd()) + "\n\n")
        md_file.write("---\n\n")
        
        # Write table of contents
        md_file.write(create_markdown_header(2, "📑 Table of Contents"))
        
        # Sort directories for consistent output
        sorted_dirs = sorted(file_structure.keys())
        
        # Group directories by type
        config_files = []
        src_files = {}
        public_files = []
        
        for dir_path in sorted_dirs:
            files = file_structure[dir_path]
            if dir_path == '':  # Root directory
                config_files = files
            elif dir_path.startswith('public'):
                public_files.extend(files)
            else:
                src_files[dir_path] = files
        
        # Write TOC grouped by type
        if config_files:
            md_file.write("### ⚙️ Configuration Files\n")
            for file_info in sorted(config_files, key=lambda x: get_file_priority(x['name'])):
                md_file.write(f"- `{file_info['name']}`\n")
            md_file.write("\n")
        
        if public_files:
            md_file.write("### 📁 Public Files\n")
            for file_info in sorted(public_files, key=lambda x: get_file_priority(x['name'])):
                md_file.write(f"- `{file_info['rel_path']}`\n")
            md_file.write("\n")
        
        if src_files:
            md_file.write("### 📦 Source Files\n")
            for dir_path in sorted(src_files.keys()):
                md_file.write(f"**{dir_path}/**\n")
                for file_info in sorted(src_files[dir_path], key=lambda x: x['name']):
                    md_file.write(f"  - `{file_info['name']}`\n")
                md_file.write("\n")
        
        md_file.write("---\n\n")
        
        # Write file contents
        md_file.write(create_markdown_header(2, "📝 Source Code"))
        
        # Write configuration files first
        if config_files:
            md_file.write(create_markdown_header(3, "⚙️ Configuration Files"))
            for file_info in sorted(config_files, key=lambda x: get_file_priority(x['name'])):
                write_file_content(md_file, file_info)
        
        # Write public files
        if public_files:
            md_file.write(create_markdown_header(3, "📁 Public Directory"))
            for file_info in sorted(public_files, key=lambda x: get_file_priority(x['name'])):
                write_file_content(md_file, file_info)
        
        # Write source files
        if src_files:
            md_file.write(create_markdown_header(3, "📦 Source Files"))
            
            # Sort directories logically
            dir_order = ['src', 'src/styles', 'src/services', 'src/pages', 'src/components']
            sorted_src_dirs = sorted(src_files.keys(), 
                                   key=lambda x: (dir_order.index(x) if x in dir_order else len(dir_order), x))
            
            for dir_path in sorted_src_dirs:
                if dir_path != 'src':  # Skip src heading if it's just the base
                    clean_path = dir_path.replace('src/', '')
                    md_file.write(create_markdown_header(4, f"📂 {clean_path}"))
                
                for file_info in sorted(src_files[dir_path], key=lambda x: get_file_priority(x['name'])):
                    write_file_content(md_file, file_info)
    
    return output_file

def write_file_content(md_file, file_info):
    """Write a single file's content to the markdown file"""
    # Emoji based on file type
    emoji_map = {
        '.jsx': '⚛️',
        '.js': '📜',
        '.json': '📋',
        '.css': '🎨',
        '.html': '🌐'
    }
    ext = os.path.splitext(file_info['name'])[1]
    emoji = emoji_map.get(ext, '📄')
    
    md_file.write(create_markdown_header(5, f"{emoji} {file_info['name']}"))
    md_file.write(f"**Path:** `{file_info['rel_path']}`\n\n")
    
    try:
        with open(file_info['path'], 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Special handling for package.json - show formatted version
        if file_info['name'] == 'package.json':
            try:
                json_data = json.loads(content)
                # Extract key information
                md_file.write("**Package Information:**\n")
                md_file.write(f"- **Name:** {json_data.get('name', 'N/A')}\n")
                md_file.write(f"- **Version:** {json_data.get('version', 'N/A')}\n")
                if 'dependencies' in json_data:
                    md_file.write(f"- **Dependencies:** {len(json_data['dependencies'])} packages\n")
                if 'devDependencies' in json_data:
                    md_file.write(f"- **Dev Dependencies:** {len(json_data['devDependencies'])} packages\n")
                md_file.write("\n")
            except:
                pass
        
        # Determine language for syntax highlighting
        lang = get_file_language(file_info['name'])
        
        md_file.write(f"```{lang}\n")
        md_file.write(content)
        if not content.endswith('\n'):
            md_file.write('\n')
        md_file.write("```\n\n")
        
    except Exception as e:
        md_file.write(f"*Error reading file: {str(e)}*\n\n")
    
    md_file.write("---\n\n")

def main():
    # Set the root directory to current directory
    root_directory = "."  # Current directory (D:)
    
    # Output file will be created in the current directory
    output_filename = "frontend_documentation.md"
    
    print(f"🚀 Starting frontend documentation generation...")
    print(f"📍 Root directory: {os.path.abspath(root_directory)}")
    
    try:
        output_path = compile_frontend_to_markdown(root_directory, output_filename)
        abs_output_path = os.path.abspath(output_path)
        print(f"\n✅ Documentation successfully generated!")
        print(f"📄 Output file: {abs_output_path}")
        
        # Show file statistics
        file_size = os.path.getsize(output_path) / 1024  # Size in KB
        print(f"📊 File size: {file_size:.2f} KB")
        
    except Exception as e:
        print(f"\n❌ Error generating documentation: {str(e)}")

if __name__ == "__main__":
    main()
