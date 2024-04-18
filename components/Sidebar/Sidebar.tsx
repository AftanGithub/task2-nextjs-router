import { cn } from '@/lib/utils'
import { LayoutDashboard } from 'lucide-react'
import React from 'react'
import LinkItem from './LinkItem'

function Sidebar() {
    
  return (
    <aside
      className={cn(
        `absolute left-0 top-0 z-9999 flex h-screen w-70 flex-col overflow-y-hidden bg-black duration-300 ease-linear  dark:bg-boxdark lg:static lg:translate-x-0 `,
       
      )}
    >

     

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="px-4 py-4  lg:px-6">
         
          <div>
            <ul
              className={cn("mb-6 flex flex-col  gap-1.5", 
                "items-center justify-center"
              )}
            >
             
              <li>
                  <LinkItem
                    icon={<LayoutDashboard />}
                    title="Dashboard"
                    href="/dashboard"
                  />
               
              </li>
         


            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  )
}

export default Sidebar