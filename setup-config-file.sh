#!/bin/bash

# Set directory and file names
dir="server"
config_file="${dir}/config.js"
template_file="${dir}/config_template.js"

# Check if config file already exists
if [ -f "${config_file}" ]; then
    echo "Configuration file ${config_file} already exists"
else
    # Check if template file exists
    if [ -f "${template_file}" ]; then
        # Check if directory already exists
        if [ -d "${dir}" ]; then
            echo "Directory '${dir}' already exists"
        else
            # Create directory
            mkdir "${dir}"
            echo "Created directory ${dir}"
        fi
            
        # Copy the content of the template file into the config file
        cp "${template_file}" "${config_file}"
        echo "Copied ${template_file} to ${config_file}"
    else
        echo "File ${template_file} does not exist"
    fi
fi